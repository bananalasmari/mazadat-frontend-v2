import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { TagComponent } from '../atoms/tag/tag.component';
import { Button } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import type { MenuItem } from 'primeng/api';
import type { DataTableColumn } from './data-table-column.interface';
import type { FilterMetadata } from 'primeng/api';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TableModule, SkeletonModule, TagComponent, Button, MenuModule, TranslatePipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T extends Record<string, unknown>> {
  /** Row data to display */
  readonly value = input.required<T[]>();
  /** Column definitions (field, header, sortable, cellType, etc.) */
  readonly columns = input.required<DataTableColumn<T>[]>();
  /** When true, shows skeleton rows instead of data (uses rows() for skeleton count). */
  readonly loading = input<boolean>(false);
  /** Rows per page (default 10) */
  readonly rows = input<number>(10);
  /** Total records for server-side pagination (when not set, uses value.length) */
  readonly totalRecords = input<number | null>(null);
  /** Paginator position: bottom, top, or both */
  readonly paginatorPosition = input<'top' | 'bottom' | 'both'>('bottom');
  /** Show "عرض X نتائج من أصل Y" (or custom) when true */
  readonly showCurrentPageReport = input(true);
  /** Current page report template; placeholders: {currentPage}, {totalPages}, {rows}, {first}, {last}, {totalRecords} */
  readonly currentPageReportTemplate = input<string>(
    'عرض {rows} نتائج من أصل {totalRecords}'
  );
  /** Rows per page options (e.g. [10, 25, 50]) */
  readonly rowsPerPageOptions = input<number[]>([10, 25, 50]);
  /** Optional extra CSS class for the table container */
  readonly styleClass = input<string>('');
  /** Optional dataKey for row identity (recommended when using selection or expansion) */
  readonly dataKey = input<string | null>(null);
  /**
   * Menu items for the actions column. Can be a static array or a function (row) => MenuItem[].
   * Each item's `id` is emitted as actionKey in rowAction.
   */
  readonly actionMenuItems = input<MenuItem[] | ((row: T) => MenuItem[])>([]);

  /** Emitted when the actions (kebab) menu is opened for a row; use with MenuItem[] or open menu programmatically */
  readonly actionMenuOpen = output<{ row: T; menu: Menu }>();
  /** Emitted when an action is selected from the row menu (e.g. view, edit, delete) */
  readonly rowAction = output<{ row: T; actionKey: string }>();

  /** When loading, show one page of skeletons; total from input or rows(). Otherwise value length or totalRecords. */
  protected totalRecordsComputed(): number {
    if (this.loading()) return this.totalRecords() ?? this.rows();
    const total = this.totalRecords();
    if (total !== null) return total;
    return this.value()?.length ?? 0;
  }

  /** When loading, pass placeholder rows so table renders skeleton row count; otherwise real value. */
  protected valueDisplayed(): T[] {
    if (this.loading()) return Array(this.rows()).fill({}) as T[];
    return this.value();
  }

  /** Filters state for PrimeNG table (advanced filter overlay). Keys = column field. */
  protected tableFilters = signal<Record<string, FilterMetadata | FilterMetadata[]>>({});

  /** Whether the column shows a filter overlay (not actions, and filterable !== false). */
  protected isColumnFilterable(col: DataTableColumn<T>): boolean {
    if (col.cellType === 'actions') return false;
    return col.filterable !== false;
  }

  protected getColumnFilterType(col: DataTableColumn<T>): 'text' | 'numeric' | 'date' {
    return col.filterType ?? 'text';
  }

  protected getCellValue(row: T, col: DataTableColumn<T>): string | number | null {
    const val = row[col.field];
    if (val === undefined || val === null) return null;
    if (col.cellType === 'date') {
      if (val instanceof Date) {
        const d = val as Date;
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      }
      if (typeof val === 'string') return val;
    }
    if (typeof val === 'object') return null;
    return val as string | number;
  }

  protected getTagValue(row: T, col: DataTableColumn<T>): string {
    const v = this.getCellValue(row, col);
    return v === null ? '' : String(v);
  }

  protected getTagSeverity(
    row: T,
    col: DataTableColumn<T>
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    if (!col.tagSeverityKey) return 'secondary';
    const s = row[col.tagSeverityKey];
    if (typeof s !== 'string') return 'secondary';
    const v = (s as string).toLowerCase();
    if (['success', 'secondary', 'info', 'warn', 'danger', 'contrast'].includes(v))
      return v as 'warn' | 'info' | 'success' | 'danger' | 'secondary' | 'contrast';
    return 'secondary';
  }

  protected onActionMenuToggle(row: T, menu: Menu): void {
    this.actionMenuOpen.emit({ row, menu });
  }

  protected getActionMenuModel(row: T): MenuItem[] {
    const items = this.actionMenuItems();
    if (!items) return [];
    const list = typeof items === 'function' ? items(row) : items;
    return list.map((item) => ({
      ...item,
      command: (event: { item?: MenuItem }) => {
        const key = (event?.item?.id ?? item.id) ?? '';
        this.rowAction.emit({ row, actionKey: key });
      },
    }));
  }

  protected onMenuSelect(event: unknown, rowData: T): void {
    const e = event as { item?: MenuItem };
    const key = e?.item?.id ?? '';
    if (key) this.rowAction.emit({ row: rowData, actionKey: key });
  }

  protected onTableFilter(event: { filters?: Record<string, FilterMetadata | undefined> }): void {
    const raw = event?.filters ?? {};
    const cleaned: Record<string, FilterMetadata | FilterMetadata[]> = {};
    for (const [key, val] of Object.entries(raw)) {
      if (val != null) cleaned[key] = val;
    }
    this.tableFilters.set(cleaned);
  }
}
