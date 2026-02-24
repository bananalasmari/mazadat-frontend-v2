import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { TypographyComponent } from '../atoms/typography/typography.component';
import { ButtonComponent } from '../atoms/button/button.component';
import { InputComponent } from '../atoms/input/input.component';
import { ExportService, type ExportColumn } from '../../../core/services/export.service';

export type SearchCardViewMode = 'grid' | 'list';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule, DrawerModule, TypographyComponent, ButtonComponent, InputComponent],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.scss',
})
export class SearchCardComponent {
  /** Card title (e.g. "جميع المركبات") */
  readonly title = input.required<string>();
  /** Subtitle or count (e.g. "8 مركبة متاحة") */
  readonly countText = input<string>('');
  /** Search input placeholder */
  readonly searchPlaceholder = input<string>('');
  /** Advanced search button label (empty = hide button). When set, shows button that opens the drawer. */
  readonly advancedSearchLabel = input<string>('');
  /**
   * Drawer configuration – can differ per component.
   * Optional overrides; when not set, sensible defaults are used.
   */
  /** Drawer header title (default: same as advancedSearchLabel). */
  readonly drawerHeader = input<string>('');
  /** Drawer position: 'left' | 'right' | 'top' | 'bottom'. */
  readonly drawerPosition = input<'left' | 'right' | 'top' | 'bottom'>('left');
  /** Drawer width (e.g. 'min(100%, 400px)' or 'min(100%, 520px)' for larger forms). */
  readonly drawerWidth = input<string>('min(100%, 400px)');
  /** Extra CSS class(es) for the drawer panel (in addition to search-card-drawer). */
  readonly drawerStyleClass = input<string>('');
  /** Export button label (empty = hide) */
  readonly exportLabel = input<string>('');
  /**
   * Table data to export when user clicks Export. When set, search card exports this data to CSV (no need to implement export in parent).
   */
  readonly exportData = input<Record<string, unknown>[]>([]);
  /** Filename for the CSV (without extension). Used when exportData is set. */
  readonly exportFileName = input<string>('export');
  /** Optional column definitions (field + header) for CSV. When set, CSV uses these headers and column order. */
  readonly exportColumns = input<ExportColumn[] | undefined>(undefined);
  /** Current view mode for the toggle */
  readonly viewMode = input<SearchCardViewMode>('list');

  /**
   * Optional two-way bindable query. When bound (e.g. [query]="filterQuery()" (queryChange)="filterQuery.set($event)")
   * the parent controls the value and can filter a data table (or any list) dynamically.
   */
  readonly query = input<string>('');
  readonly queryChange = output<string>();

  readonly searchSubmit = output<string>();
  readonly viewModeChange = output<SearchCardViewMode>();
  readonly exportClick = output<void>();
  /** Emitted when the advanced search drawer is opened. */
  readonly advancedSearchOpen = output<void>();

  private readonly exportService = inject(ExportService);
  protected searchQuery = signal('');
  protected drawerVisible = signal(false);

  /** Display value: bound query() or internal searchQuery so clear icon shows as soon as user types */
  protected getSearchValue(): string {
    const q = this.query();
    const internal = this.searchQuery();
    return (q !== undefined && q !== null ? q : internal) || internal;
  }

  protected hasSearchValue(): boolean {
    return this.getSearchValue().length > 0;
  }

  protected onSearchChange(value: string): void {
    this.searchQuery.set(value);
    this.queryChange.emit(value);
  }

  protected onSearchSubmit(): void {
    const q = this.getSearchValue().trim();
    this.searchSubmit.emit(q);
  }

  protected setViewMode(mode: SearchCardViewMode): void {
    this.viewModeChange.emit(mode);
  }

  protected onExport(): void {
    const data = this.exportData();
    if (data?.length) {
      this.exportService.exportTableToExcel(
        data,
        this.exportFileName(),
        this.exportColumns()
      );
    }
    this.exportClick.emit();
  }

  protected openAdvancedSearchDrawer(): void {
    this.drawerVisible.set(true);
    this.advancedSearchOpen.emit();
  }

  protected onDrawerVisibleChange(visible: boolean): void {
    this.drawerVisible.set(visible);
  }

  /** Close the advanced search drawer (e.g. from parent after Search/Reset). */
  closeAdvancedSearchDrawer(): void {
    this.drawerVisible.set(false);
  }

  /** Resolved drawer header: drawerHeader input or advancedSearchLabel. */
  protected getDrawerHeader(): string {
    const h = this.drawerHeader();
    return h !== undefined && h !== '' ? h : this.advancedSearchLabel();
  }

  /** Resolved drawer styleClass: base class + optional drawerStyleClass input. */
  protected getDrawerStyleClass(): string {
    const extra = this.drawerStyleClass();
    const base = 'search-card-drawer';
    return extra ? `${base} ${extra}`.trim() : base;
  }
}
