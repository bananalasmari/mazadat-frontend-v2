import { Injectable } from '@angular/core';

/** Default rows per page for data tables. */
export const DEFAULT_ROWS_PER_PAGE = 10;

/** Default rows-per-page options for pagination. */
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

/**
 * Reusable service for table filtering and shared pagination defaults.
 * Use in any component that has a search card + data table to avoid duplicating filter logic.
 */
@Injectable({ providedIn: 'root' })
export class TableFilterService {
  /**
   * Filters rows by a search query across the given fields.
   * Query is trimmed and compared case-insensitively; each field value is stringified and checked for inclusion.
   *
   * @param data Full list of rows
   * @param query Search string (e.g. from search card)
   * @param fields Keys of the row object to search in
   * @returns Filtered array (or full array when query is empty)
   */
  filter<T extends Record<string, unknown>>(
    data: T[],
    query: string,
    fields: (keyof T)[]
  ): T[] {
    const q = (query ?? '').trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      fields.some((key) =>
        String(row[key] ?? '').toLowerCase().includes(q)
      )
    );
  }
}
