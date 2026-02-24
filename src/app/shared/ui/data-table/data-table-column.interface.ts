/**
 * Column definition for the data table.
 */
export interface DataTableColumn<T = unknown> {
  /** Property key on the row object */
  field: keyof T & string;
  /** Header label (e.g. for RTL: رقم التسجيل, المركبة) */
  header: string;
  /** Enable sorting for this column (default: true) */
  sortable?: boolean;
  /** Show filter overlay for this column (default: true for text/tag/date, false for actions) */
  filterable?: boolean;
  /** Filter input type when filterable: 'text' | 'numeric' | 'date' (default: 'text') */
  filterType?: 'text' | 'numeric' | 'date';
  /** How to render the cell: text, tag (status badge), date, or actions (kebab menu) */
  cellType?: 'text' | 'tag' | 'date' | 'actions';
  /**
   * For cellType 'tag': severity key on the row (e.g. 'statusSeverity')
   * or a fixed severity when not present: 'warn' | 'info' | 'success' | 'danger' | 'secondary'
   */
  tagSeverityKey?: keyof T & string;
  /** For cellType 'date': optional date format (default DD-MM-YYYY) */
  dateFormat?: string;
}
