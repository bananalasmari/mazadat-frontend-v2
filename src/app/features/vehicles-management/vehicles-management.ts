import { Component, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { MenuItem } from 'primeng/api';
import { TypographyComponent } from '../../shared/ui/atoms/typography/typography.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import {
  DEFAULT_ROWS_PER_PAGE,
  DEFAULT_ROWS_PER_PAGE_OPTIONS,
  TableFilterService,
} from '../../core/services/table-filter.service';
import { ActionCardComponent } from '../../shared/ui/action-card/action-card.component';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { DropdownComponent, type DropdownOption } from '../../shared/ui/atoms/dropdown/dropdown.component';
import { InputComponent } from '../../shared/ui/atoms/input/input.component';
import { DataTableComponent } from '../../shared/ui/data-table/data-table.component';
import type { DataTableColumn } from '../../shared/ui/data-table/data-table-column.interface';
import { SearchCardComponent, type SearchCardViewMode } from '../../shared/ui/search-card/search-card.component';

export interface VehicleRegistrationRow extends Record<string, unknown> {
  registrationNumber: string;
  vehicle: string;
  plate: string;
  platformStatus: string;
  platformStatusSeverity: 'warn' | 'info';
  addedDate: string;
  city: string;
}

const VEHICLE_TABLE_DATA: VehicleRegistrationRow[] = [
  { registrationNumber: '12839103010', vehicle: 'تويوتا بكب غمارتين', plate: 'غ أ ب 9012', platformStatus: 'بانتظار التسجيل', platformStatusSeverity: 'warn', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103011', vehicle: 'تويوتا كامري 2024', plate: 'غ أ ب 9012', platformStatus: 'بانتظار الجدولة', platformStatusSeverity: 'info', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103012', vehicle: 'سايك موتر ام جي 5', plate: 'غ أ ب 9012', platformStatus: 'بانتظار التسجيل', platformStatusSeverity: 'warn', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103013', vehicle: 'هيونداي ستارجيزر', plate: 'غ أ ب 9012', platformStatus: 'بانتظار الجدولة', platformStatusSeverity: 'info', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103014', vehicle: 'ها فال جوليان برو 2025', plate: 'غ أ ب 9012', platformStatus: 'بانتظار التسجيل', platformStatusSeverity: 'warn', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103015', vehicle: 'فورد جراند ماركيز 2010', plate: 'غ أ ب 9012', platformStatus: 'بانتظار الجدولة', platformStatusSeverity: 'info', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103016', vehicle: 'شفروليه ابيكا سيدان 2010', plate: 'غ أ ب 9012', platformStatus: 'بانتظار التسجيل', platformStatusSeverity: 'warn', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103017', vehicle: 'تويوتا كامري 2024', plate: 'غ أ ب 9012', platformStatus: 'بانتظار الجدولة', platformStatusSeverity: 'info', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103018', vehicle: 'تويوتا كامري 2024', plate: 'غ أ ب 9012', platformStatus: 'بانتظار التسجيل', platformStatusSeverity: 'warn', addedDate: '12-01-2026', city: 'الرياض' },
  { registrationNumber: '12839103019', vehicle: 'تويوتا كامري 2024', plate: 'غ أ ب 9012', platformStatus: 'بانتظار الجدولة', platformStatusSeverity: 'info', addedDate: '12-01-2026', city: 'الرياض' },
];

/** Field keys used for search-card filtering of the vehicles table. */
const VEHICLE_FILTER_FIELDS: (keyof VehicleRegistrationRow)[] = [
  'registrationNumber',
  'vehicle',
  'plate',
  'city',
];

/** Build year options for dropdown (e.g. 2010–2030). */
function yearOptions(start: number, end: number): DropdownOption[] {
  const opts: DropdownOption[] = [];
  for (let y = end; y >= start; y--) opts.push({ label: String(y), value: y });
  return opts;
}


@Component({
  selector: 'app-vehicles-management',
  imports: [
    FormsModule,
    TypographyComponent,
    TranslatePipe,
    ActionCardComponent,
    ButtonComponent,
    InputComponent,
    DropdownComponent,
    DataTableComponent,
    SearchCardComponent,
  ],
  templateUrl: './vehicles-management.html',
})
export class VehiclesManagement {
  private readonly i18n = inject(TranslationService);
  private readonly tableFilter = inject(TableFilterService);

  readonly searchCardRef = viewChild(SearchCardComponent);

  readonly vehicleData = VEHICLE_TABLE_DATA;
  readonly totalVehicleRecords = 156;

  /** Advanced search form state */
  readonly advancedRegistrationNumber = signal('');
  readonly advancedChassisNumber = signal('');
  readonly advancedSerialNumber = signal('');
  readonly advancedYear = signal<number | null>(null);
  readonly advancedPlatePart1 = signal('');
  readonly advancedPlatePart2 = signal('');
  readonly advancedRegistrationStatus = signal<string | null>(null);
  readonly advancedCity = signal<string | null>(null);
  readonly advancedInstantSale = signal<string | null>(null);
  readonly advancedSaleRisk = signal<string | null>(null);
  readonly advancedSecurityRequired = signal<string | null>(null);
  readonly advancedKeyAvailability = signal<string | null>(null);
  readonly advancedExecutedService = signal<string | null>(null);

  readonly yearOptions = yearOptions(2010, 2030);
  readonly registrationStatusOptions: DropdownOption[] = [
    { label: 'بانتظار التسجيل', value: 'pending_registration' },
    { label: 'بانتظار الجدولة', value: 'pending_schedule' },
  ];
  readonly cityOptions: DropdownOption[] = [
    { label: 'الرياض', value: 'riyadh' },
    { label: 'جدة', value: 'jeddah' },
    { label: 'الدمام', value: 'dammam' },
  ];
  get yesNoOptions(): DropdownOption[] {
    const t = (k: string) => this.i18n.t(k);
    return [
      { label: t('vehiclesManagement.advancedSearch.yes'), value: 'yes' },
      { label: t('vehiclesManagement.advancedSearch.no'), value: 'no' },
    ];
  }
  readonly executedServiceOptions: DropdownOption[] = [
    { label: 'Service 1', value: 'service_1' },
    { label: 'Service 2', value: 'service_2' },
  ];

  /** Table data filtered by search card query (registration, vehicle, plate, city). */
  get filteredVehicleData(): VehicleRegistrationRow[] {
    return this.tableFilter.filter(
      this.vehicleData,
      this.filterQuery(),
      VEHICLE_FILTER_FIELDS
    );
  }

  /** Table data after applying both quick search and advanced search filters. Used for table display, count, and export. */
  get tableData(): VehicleRegistrationRow[] {
    return this.applyAdvancedFilters(this.filteredVehicleData);
  }

  /** Applies advanced search form criteria to a list of rows. Only filters on fields that exist on the row. */
  private applyAdvancedFilters(rows: VehicleRegistrationRow[]): VehicleRegistrationRow[] {
    const regNum = this.advancedRegistrationNumber()?.trim() ?? '';
    const plate1 = this.advancedPlatePart1()?.trim() ?? '';
    const plate2 = this.advancedPlatePart2()?.trim() ?? '';
    const statusValue = this.advancedRegistrationStatus();
    const cityValue = this.advancedCity();

    const statusLabel = statusValue ? this.registrationStatusOptions.find((o) => o.value === statusValue)?.label : null;
    const cityLabel = cityValue ? this.cityOptions.find((o) => o.value === cityValue)?.label : null;

    return rows.filter((row) => {
      if (regNum && !String(row.registrationNumber).toLowerCase().includes(regNum.toLowerCase())) return false;
      if (plate1 && !String(row.plate).toLowerCase().includes(plate1.toLowerCase())) return false;
      if (plate2 && !String(row.plate).toLowerCase().includes(plate2.toLowerCase())) return false;
      if (statusLabel != null && row.platformStatus !== statusLabel) return false;
      if (cityLabel != null && row.city !== cityLabel) return false;
      return true;
    });
  }

  readonly rowsPerPage = DEFAULT_ROWS_PER_PAGE;
  readonly rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS;
  readonly viewMode = signal<SearchCardViewMode>('list');
  /** Search query from search card – filters the table when bound with [query] and (queryChange). */
  readonly filterQuery = signal('');

  get vehicleColumns(): DataTableColumn<VehicleRegistrationRow>[] {
    const t = (key: string) => this.i18n.t(key);
    return [
      { field: 'registrationNumber', header: t('vehiclesManagement.columns.registrationNumber'), sortable: true },
      { field: 'vehicle', header: t('vehiclesManagement.columns.vehicle'), sortable: true },
      { field: 'plate', header: t('vehiclesManagement.columns.plate'), sortable: true },
      {
        field: 'platformStatus',
        header: t('vehiclesManagement.columns.platformStatus'),
        sortable: true,
        cellType: 'tag',
        tagSeverityKey: 'platformStatusSeverity',
      },
      { field: 'addedDate', header: t('vehiclesManagement.columns.addDate'), sortable: true, cellType: 'date' },
      { field: 'city', header: t('vehiclesManagement.columns.city'), sortable: true },
      {
        field: 'registrationNumber' as keyof VehicleRegistrationRow & string,
        header: t('vehiclesManagement.columns.actions'),
        sortable: false,
        cellType: 'actions',
      },
    ];
  }

  get vehicleActionMenuItems(): MenuItem[] {
    const t = (key: string) => this.i18n.t(key);
    return [
      { id: 'view', label: t('vehiclesManagement.actions.view'), icon: 'pi pi-eye' },
      { id: 'edit', label: t('vehiclesManagement.actions.edit'), icon: 'pi pi-pencil' },
      { id: 'delete', label: t('vehiclesManagement.actions.delete'), icon: 'pi pi-trash', severity: 'danger' },
    ];
  }

  get searchCardCountText(): string {
    const count = this.tableData.length;
    return this.i18n.t('vehiclesManagement.searchCard.count', { count });
  }

  /** Column definitions for CSV export (field + translated header). */
  get vehicleExportColumns(): { field: string; header: string }[] {
    const t = (key: string) => this.i18n.t(key);
    return [
      { field: 'registrationNumber', header: t('vehiclesManagement.columns.registrationNumber') },
      { field: 'vehicle', header: t('vehiclesManagement.columns.vehicle') },
      { field: 'plate', header: t('vehiclesManagement.columns.plate') },
      { field: 'platformStatus', header: t('vehiclesManagement.columns.platformStatus') },
      { field: 'addedDate', header: t('vehiclesManagement.columns.addDate') },
      { field: 'city', header: t('vehiclesManagement.columns.city') },
    ];
  }

  onViewModeChange(mode: SearchCardViewMode): void {
    this.viewMode.set(mode);
  }

  onAddVehicle(): void {
    // TODO: navigate to add vehicle flow
  }

  onInstantSale(): void {
    // TODO: navigate to instant sale service flow
  }

  onVehicleRowAction(payload: { row: VehicleRegistrationRow; actionKey: string }): void {
    // TODO: handle view / edit / delete by actionKey
  }

  onSearchSubmit(_query: string): void {
    // Filtering is already live via (queryChange); submit can be used for API search if needed.
  }

  onAdvancedSearchSubmit(): void {
    // TODO: apply advanced filters to table or call API
    this.searchCardRef()?.closeAdvancedSearchDrawer();
  }

  onAdvancedSearchReset(): void {
    this.advancedRegistrationNumber.set('');
    this.advancedChassisNumber.set('');
    this.advancedSerialNumber.set('');
    this.advancedYear.set(null);
    this.advancedPlatePart1.set('');
    this.advancedPlatePart2.set('');
    this.advancedRegistrationStatus.set(null);
    this.advancedCity.set(null);
    this.advancedInstantSale.set(null);
    this.advancedSaleRisk.set(null);
    this.advancedSecurityRequired.set(null);
    this.advancedKeyAvailability.set(null);
    this.advancedExecutedService.set(null);
  }
}
