/** Quick action item from backend – discriminated by type */

export type QuickActionType = 'sales_agreement' | 'vehicle_sale' | 'vehicle_dues';

export interface QuickActionBase {
  id: string;
  type: QuickActionType;
}

export interface SalesAgreementQuickAction extends QuickActionBase {
  type: 'sales_agreement';
  important?: boolean;
  /** From backend: card title */
  title?: string;
  /** From backend: card body/description */
  body?: string;
  /** From backend: badge label (e.g. "Important") */
  badgeText?: string;
  /** From backend: primary button label */
  buttonText?: string;
  /** From backend: image URL or icon identifier */
  imageUrl?: string | null;
  icon?: string;
}

export interface VehicleSaleQuickAction extends QuickActionBase {
  type: 'vehicle_sale';
  vehicleName: string;
  purchaseType: string;
  price: string;
  imageUrl?: string | null;
  /** From backend: card title */
  title?: string;
  /** From backend: reject button label */
  rejectLabel?: string;
  /** From backend: accept button label */
  acceptLabel?: string;
}

export interface VehicleDuesQuickAction extends QuickActionBase {
  type: 'vehicle_dues';
  body: string;
  /** From backend: card title */
  title?: string;
  /** From backend: primary button label */
  buttonText?: string;
  /** From backend: image URL or icon identifier */
  imageUrl?: string | null;
  icon?: string;
}

export type QuickActionItem =
  | SalesAgreementQuickAction
  | VehicleSaleQuickAction
  | VehicleDuesQuickAction;

export interface QuickActionsSection {
  title?: string;
  subtitle?: string;
}

export interface QuickActionsResponse {
  items: QuickActionItem[];
  /** Optional section heading from backend */
  section?: QuickActionsSection;
}
