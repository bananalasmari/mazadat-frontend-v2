import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ExportColumn {
  /** Property key on the row object */
  field: string;
  /** Header label in the exported file (e.g. translated) */
  header: string;
}

/**
 * Service to export table data to Excel (and CSV). Used by search-card and can be used anywhere.
 */
@Injectable({ providedIn: 'root' })
export class ExportService {
  /**
   * Exports an array of row objects to Excel (.xlsx) and triggers download.
   * @param data Array of row objects (e.g. filtered table data)
   * @param filename File name without extension (default 'export')
   * @param columns Optional column definitions for header labels and order. If omitted, uses object keys of first row as headers.
   */
  exportTableToExcel(
    data: Record<string, unknown>[],
    filename: string = 'export',
    columns?: ExportColumn[]
  ): void {
    if (!data?.length) return;

    const headers = columns
      ? columns.map((c) => c.header)
      : Object.keys(data[0] as Record<string, unknown>);
    const keys = columns
      ? columns.map((c) => c.field)
      : Object.keys(data[0] as Record<string, unknown>);

    const row = (r: Record<string, unknown>) =>
      keys.map((k) => {
        const v = r[k];
        return v === null || v === undefined ? '' : v;
      });
    const aoa: unknown[][] = [headers, ...data.map((r) => row(r as Record<string, unknown>))];
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  /**
   * Exports an array of row objects to CSV and triggers download.
   * @param data Array of row objects (e.g. filtered table data)
   * @param filename File name without extension (default 'export')
   * @param columns Optional column definitions for header labels and order.
   */
  exportTableToCsv(
    data: Record<string, unknown>[],
    filename: string = 'export',
    columns?: ExportColumn[]
  ): void {
    if (!data?.length) return;

    const headers = columns
      ? columns.map((c) => c.header)
      : Object.keys(data[0] as Record<string, unknown>);
    const keys = columns
      ? columns.map((c) => c.field)
      : Object.keys(data[0] as Record<string, unknown>);

    const escape = (v: unknown): string => {
      const s = v === null || v === undefined ? '' : String(v);
      if (/[,"\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };

    const headerRow = headers.map(escape).join(',');
    const dataRows = data.map((row) =>
      keys.map((k) => escape((row as Record<string, unknown>)[k])).join(',')
    );
    const csv = [headerRow, ...dataRows].join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
