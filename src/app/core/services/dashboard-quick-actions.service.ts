import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type {
  QuickActionItem,
  QuickActionsResponse,
  QuickActionsSection,
  SalesAgreementQuickAction,
  VehicleSaleQuickAction,
  VehicleDuesQuickAction,
} from '../models/quick-action.model';

export interface QuickActionsData {
  section: QuickActionsSection | null;
  items: QuickActionItem[];
}

function mockQuickActions(): QuickActionsData {
  return {
    section: null,
    items: [
      {
        id: '1',
        type: 'sales_agreement',
        important: true,
      } as SalesAgreementQuickAction,
      {
        id: '2',
        type: 'vehicle_sale',
        vehicleName: 'Porsche 911 GT3',
        purchaseType: 'Immediate purchase',
        price: '95,000',
        imageUrl: null,
      } as VehicleSaleQuickAction,
      {
        id: '3',
        type: 'vehicle_dues',
        body: 'Lexus 600 LX awaiting registration process',
      } as VehicleDuesQuickAction,
    ],
  };
}

@Injectable({ providedIn: 'root' })
export class DashboardQuickActionsService {
  private readonly http = inject(HttpClient);

  /** Fetches quick actions from the backend. Falls back to mock data if the API is not available. */
  getQuickActions(): Observable<QuickActionsData> {
    return this.http
      .get<QuickActionsResponse | QuickActionItem[]>('/api/v2/dashboard/quick-actions')
      .pipe(
        map((res): QuickActionsData => {
          if (Array.isArray(res)) {
            return { section: null, items: res };
          }
          const r = res as QuickActionsResponse;
          return {
            section: r.section ?? null,
            items: r.items ?? [],
          };
        }),
        catchError(() => of(mockQuickActions())),
      );
  }
}
