import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';
import { DropdownComponent, DropdownOption } from '../../shared/ui/atoms/dropdown/dropdown.component';
import { TypographyComponent } from '../../shared/ui/atoms/typography/typography.component';
import { TranslationService } from '../../core/i18n/translation.service';
import { ActiveListingsComponent } from './active-listings/active-listings.component';
import { DashboardChartsComponent } from './dashboard-charts/dashboard-charts.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { LatestAuctionsComponent } from './latest-auctions/latest-auctions.component';
import { QuickLinks } from './quick-links/quick-links';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TypographyComponent,
    TranslatePipe,
    ButtonComponent,
    DropdownComponent,
    DashboardStatsComponent,
    QuickLinks,
    ActiveListingsComponent,
    LatestAuctionsComponent,
    DashboardChartsComponent,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly i18n = inject(TranslationService);

  readonly selectedDateRange = signal<string>('30');

  readonly dateRangeOptions = computed<DropdownOption[]>(() => {
    const t = (key: string) => this.i18n.t(key);
    return [
      { label: t('dashboard.dateRangeLast7'), value: '7' },
      { label: t('dashboard.dateRangeLast30'), value: '30' },
      { label: t('dashboard.dateRangeLast90'), value: '90' },
    ];
  });

  onCustomizePage(): void {
    // TODO: open customize page / settings
  }

  onExport(): void {
    window.print();
  }
}
