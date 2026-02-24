import type { Meta, StoryObj } from '@storybook/angular';
import { DataTableComponent } from './data-table.component';
import type { DataTableColumn } from './data-table-column.interface';
import type { MenuItem } from 'primeng/api';

/** Row type for the vehicle/registration table (matches screenshot) */
interface VehicleRegistrationRow extends Record<string, unknown> {
  registrationNumber: string;
  vehicle: string;
  plate: string;
  platformStatus: string;
  platformStatusSeverity: 'warn' | 'info';
  addedDate: string;
  city: string;
}

const columns: DataTableColumn<VehicleRegistrationRow>[] = [
  { field: 'registrationNumber', header: 'رقم التسجيل', sortable: true },
  { field: 'vehicle', header: 'المركبة', sortable: true },
  { field: 'plate', header: 'اللوحة', sortable: true },
  {
    field: 'platformStatus',
    header: 'حالة التسجيل في المنصة',
    sortable: true,
    cellType: 'tag',
    tagSeverityKey: 'platformStatusSeverity',
  },
  { field: 'addedDate', header: 'تاريخ الإضافة', sortable: true, cellType: 'date' },
  { field: 'city', header: 'المدينة', sortable: true },
  {
    field: 'registrationNumber' as keyof VehicleRegistrationRow & string,
    header: 'الإجراءات',
    sortable: false,
    cellType: 'actions',
  },
];

const sampleData: VehicleRegistrationRow[] = [
  {
    registrationNumber: '12839103010',
    vehicle: 'تويوتا بكب غمارتين',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار التسجيل',
    platformStatusSeverity: 'warn',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103011',
    vehicle: 'تويوتا كامري 2024',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار الجدولة',
    platformStatusSeverity: 'info',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103012',
    vehicle: 'سايك موتر ام جي 5',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار التسجيل',
    platformStatusSeverity: 'warn',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103013',
    vehicle: 'هيونداي ستارجيزر',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار الجدولة',
    platformStatusSeverity: 'info',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103014',
    vehicle: 'ها فال جوليان برو 2025',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار التسجيل',
    platformStatusSeverity: 'warn',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103015',
    vehicle: 'فورد جراند ماركيز 2010',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار الجدولة',
    platformStatusSeverity: 'info',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103016',
    vehicle: 'شفروليه ابيكا سيدان 2010',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار التسجيل',
    platformStatusSeverity: 'warn',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103017',
    vehicle: 'تويوتا لاندكروزر 2023',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار الجدولة',
    platformStatusSeverity: 'info',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103018',
    vehicle: 'نيسان باترول 2024',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار التسجيل',
    platformStatusSeverity: 'warn',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
  {
    registrationNumber: '12839103019',
    vehicle: 'كيا سبورتاج 2024',
    plate: 'غ أ ب 9012',
    platformStatus: 'بانتظار الجدولة',
    platformStatusSeverity: 'info',
    addedDate: '12-01-2026',
    city: 'الرياض',
  },
];

const actionMenuItems: MenuItem[] = [
  { id: 'view', label: 'عرض', icon: 'pi pi-eye' },
  { id: 'edit', label: 'تعديل', icon: 'pi pi-pencil' },
  { id: 'delete', label: 'حذف', icon: 'pi pi-trash', severity: 'danger' },
];

const meta: Meta<DataTableComponent<VehicleRegistrationRow>> = {
  title: 'Shared/UI/DataTable',
  component: DataTableComponent<VehicleRegistrationRow>,
  tags: ['autodocs'],
  args: {
    value: sampleData,
    columns,
    rows: 10,
    totalRecords: null,
    paginatorPosition: 'bottom',
    showCurrentPageReport: true,
    currentPageReportTemplate: 'عرض {rows} نتائج من أصل {totalRecords}',
    rowsPerPageOptions: [10, 25, 50],
    actionMenuItems,
  },
  argTypes: {
    value: { control: false, description: 'Row data array' },
    columns: { control: false, description: 'Column definitions' },
    rows: { control: 'number' },
    totalRecords: { control: 'number', description: 'For server-side pagination' },
    paginatorPosition: {
      control: 'radio',
      options: ['top', 'bottom', 'both'],
    },
    showCurrentPageReport: { control: 'boolean' },
    currentPageReportTemplate: { control: 'text' },
    actionMenuItems: { control: false },
    actionMenuOpen: { action: 'actionMenuOpen' },
    rowAction: { action: 'rowAction' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Reusable PrimeNG data table with sortable columns, status tags, date column, and row actions menu. Supports RTL and Arabic labels. Wrap in a container with `dir="rtl"` for right-to-left layout.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<DataTableComponent<VehicleRegistrationRow>>;

export const Default: Story = {};

export const VehicleRegistrations: Story = {
  name: 'Vehicle registrations (10 of 156)',
  args: {
    value: sampleData,
    columns,
    rows: 10,
    totalRecords: 156,
    rowsPerPageOptions: [10, 25, 50],
    actionMenuItems,
  },
};

export const FewRows: Story = {
  name: 'Few rows (no pagination)',
  args: {
    value: sampleData.slice(0, 3),
    columns,
    rows: 10,
    actionMenuItems,
  },
};

export const Empty: Story = {
  name: 'Empty state',
  args: {
    value: [],
    columns,
    rows: 10,
    actionMenuItems,
  },
};
