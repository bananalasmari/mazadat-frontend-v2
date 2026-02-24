import type { Translation } from 'primeng/api';

/** PrimeNG translation for Arabic (table filter overlay and common). */
export const PRIMENG_LOCALE_AR: Translation = {
  // Filter match modes (text)
  startsWith: 'يبدأ بـ',
  contains: 'يحتوي على',
  notContains: 'لا يحتوي على',
  endsWith: 'ينتهي بـ',
  equals: 'يساوي',
  notEquals: 'لا يساوي',
  noFilter: 'بدون تصفية',
  // Filter match modes (numeric)
  lt: 'أقل من',
  lte: 'أقل من أو يساوي',
  gt: 'أكبر من',
  gte: 'أكبر من أو يساوي',
  is: 'يساوي',
  isNot: 'لا يساوي',
  // Filter match modes (date)
  before: 'قبل',
  after: 'بعد',
  dateIs: 'التاريخ يساوي',
  dateIsNot: 'التاريخ لا يساوي',
  dateBefore: 'التاريخ قبل',
  dateAfter: 'التاريخ بعد',
  // Filter overlay buttons and labels
  clear: 'مسح',
  apply: 'تطبيق',
  matchAll: 'مطابقة الكل',
  matchAny: 'مطابقة أي',
  addRule: 'إضافة شرط',
  removeRule: 'إزالة الشرط',
  // Common
  accept: 'موافق',
  reject: 'رفض',
  cancel: 'إلغاء',
  choose: 'اختر',
  // Table filter
  emptyFilterMessage: 'لا توجد نتائج',
  emptyMessage: 'لا توجد بيانات',
  // Aria for filter
  aria: {
    showFilterMenu: 'إظهار قائمة التصفية',
    hideFilterMenu: 'إخفاء قائمة التصفية',
    filterOperator: 'معامل التصفية',
    filterConstraint: 'قيد التصفية',
  },
};

/** PrimeNG translation for English (table filter overlay and common). */
export const PRIMENG_LOCALE_EN: Translation = {
  startsWith: 'Starts with',
  contains: 'Contains',
  notContains: 'Not contains',
  endsWith: 'Ends with',
  equals: 'Equals',
  notEquals: 'Not equals',
  noFilter: 'No filter',
  lt: 'Less than',
  lte: 'Less than or equal',
  gt: 'Greater than',
  gte: 'Greater than or equal',
  is: 'Is',
  isNot: 'Is not',
  before: 'Before',
  after: 'After',
  dateIs: 'Date is',
  dateIsNot: 'Date is not',
  dateBefore: 'Date before',
  dateAfter: 'Date after',
  clear: 'Clear',
  apply: 'Apply',
  matchAll: 'Match all',
  matchAny: 'Match any',
  addRule: 'Add rule',
  removeRule: 'Remove rule',
  accept: 'Accept',
  reject: 'Reject',
  cancel: 'Cancel',
  choose: 'Choose',
  emptyFilterMessage: 'No results found',
  emptyMessage: 'No data',
  aria: {
    showFilterMenu: 'Show filter menu',
    hideFilterMenu: 'Hide filter menu',
    filterOperator: 'Filter operator',
    filterConstraint: 'Filter constraint',
  },
};
