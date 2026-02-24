import { Component, effect, inject, signal } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';

export interface DashboardStatItem {
  titleKey: string;
  trendLabelKey: string;
  value: string;
  trendPercent: number;
  trendPositive: boolean;
  icon: string;
}

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [TypographyComponent],
  templateUrl: './dashboard-stats.component.html',
})
export class DashboardStatsComponent {
  private readonly i18n = inject(TranslationService);

  readonly items = signal<DashboardStatItem[]>([]);

  constructor() {
    effect(() => {
      this.i18n.lang();
      const t = (key: string) => this.i18n.t(key);
      this.items.set([
        {
          titleKey: 'dashboard.stats.bidders',
          trendLabelKey: 'dashboard.stats.biddersTrend',
          value: '1,429',
          trendPercent: 12.5,
          trendPositive: true,
          icon: 'pi pi-users',
        },
        {
          titleKey: 'dashboard.stats.averageSalePrice',
          trendLabelKey: 'dashboard.stats.averageSalePriceTrend',
          value: '87,450',
          trendPercent: 2.1,
          trendPositive: false,
          icon: 'pi pi-chart-line',
        },
        {
          titleKey: 'dashboard.stats.activeAuctions',
          trendLabelKey: 'dashboard.stats.activeAuctionsTrend',
          value: '47',
          trendPercent: 12.5,
          trendPositive: true,
          icon: 'pi pi-bolt',
        },
        {
          titleKey: 'dashboard.stats.totalRevenue',
          trendLabelKey: 'dashboard.stats.totalRevenueTrend',
          value: '2,847,690',
          trendPercent: 12.5,
          trendPositive: true,
          icon: 'pi pi-wallet',
        },
      ]);
    });
  }

  trendSign(positive: boolean): string {
    return positive ? '+' : '';
  }

  title(item: DashboardStatItem): string {
    return this.i18n.t(item.titleKey);
  }

  trendLabel(item: DashboardStatItem): string {
    return this.i18n.t(item.trendLabelKey);
  }

  isCurrency(item: DashboardStatItem): boolean {
    return item.titleKey.includes('SalePrice') || item.titleKey.includes('Revenue');
  }

  formatValue(item: DashboardStatItem): string {
    return item.value;
  }

  readonly riyalIconUrl = '/assets/icons/riyal.svg';
}
