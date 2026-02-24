import type { TranslationService } from '../../core/i18n/translation.service';

/** Filter item shape (used by getSearchCardFilters; search card no longer has filters UI). */
export interface SearchCardFilterItem {
  id: string;
  label: string;
  icon?: string;
  options?: { value: string; label: string }[];
}

/**
 * Default search card filter config (id + i18n key suffix + optional icon).
 * Define once here; reuse in any component that uses app-search-card.
 */
const DEFAULT_SEARCH_CARD_FILTER_CONFIG: ReadonlyArray<{
  id: string;
  labelKeySuffix: string;
  icon?: string;
}> = [
  { id: 'status', labelKeySuffix: 'filterRegistrationStatus' },
  { id: 'columns', labelKeySuffix: 'filterCustomizeColumns' },
  { id: 'advanced', labelKeySuffix: 'filterAdvancedSearch', icon: 'pi pi-filter' },
];

/**
 * Options passed to getSearchCardFilters to drive filters from table data (e.g. status column).
 */
export interface GetSearchCardFiltersOptions {
  /** Options for the "status" filter, usually from the table's status column (distinct values). */
  statusOptions?: { value: string; label: string }[];
}

/**
 * Returns distinct values from a table column as { value, label } for use as status (or any) filter options.
 * Use for any table: pass your data and the status field key (e.g. 'platformStatus', 'orderStatus').
 */
export function getDistinctStatusOptions<T extends Record<string, unknown>>(
  data: T[],
  statusField: keyof T
): { value: string; label: string }[] {
  const seen = new Set<string>();
  const result: { value: string; label: string }[] = [];
  for (const row of data ?? []) {
    const raw = row[statusField];
    const value = String(raw ?? '').trim();
    if (value && !seen.has(value)) {
      seen.add(value);
      result.push({ value, label: value });
    }
  }
  return result;
}

/**
 * Returns translated search card filters for use with app-search-card.
 * Use in any component that has a search card with the default filters.
 *
 * @param i18n TranslationService (inject in your component)
 * @param baseKey i18n base key for the search card (e.g. 'vehiclesManagement.searchCard').
 *   Your i18n must have baseKey.filterRegistrationStatus, baseKey.filterCustomizeColumns, baseKey.filterAdvancedSearch.
 * @param options Optional: pass statusOptions (e.g. from getDistinctStatusOptions(tableData, 'statusField')) so the status filter reads from the table.
 * @returns Array of { id, label, icon?, options? } for [filters] input
 */
export function getSearchCardFilters(
  i18n: Pick<TranslationService, 't'>,
  baseKey: string,
  options?: GetSearchCardFiltersOptions
): SearchCardFilterItem[] {
  const base = baseKey.endsWith('.') ? baseKey : baseKey + '.';
  const statusOptions = options?.statusOptions;
  return DEFAULT_SEARCH_CARD_FILTER_CONFIG.map(({ id, labelKeySuffix, icon }) => {
    const item: SearchCardFilterItem = {
      id,
      label: i18n.t(base + labelKeySuffix),
      ...(icon && { icon }),
    };
    if (id === 'status' && statusOptions?.length) {
      item.options = statusOptions;
    }
    return item;
  });
}
