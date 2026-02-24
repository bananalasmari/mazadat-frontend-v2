import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { TagComponent } from '../../../shared/ui/atoms/tag/tag.component';

export interface LatestAuctionItem {
  id: string;
  price: string;
  carName: string;
  idDate: string;
  imageUrl: string;
  status?: string;
}

const DEMO_IMAGE = '/assets/images/demo-car.jpeg';

@Component({
  selector: 'app-latest-auctions',
  standalone: true,
  imports: [TypographyComponent, TagComponent],
  templateUrl: './latest-auctions.component.html',
})
export class LatestAuctionsComponent {
  private readonly i18n = inject(TranslationService);

  readonly title = () => this.i18n.t('dashboard.latestAuctions.title');
  readonly subtitle = () => this.i18n.t('dashboard.latestAuctions.subtitle');
  readonly viewAllLabel = () => this.i18n.t('dashboard.latestAuctions.viewAll');
  readonly pendingLabel = () => this.i18n.t('dashboard.latestAuctions.pending');
  readonly downloadLabel = () => this.i18n.t('dashboard.latestAuctions.download');
  readonly filterLabel = () => this.i18n.t('dashboard.latestAuctions.filter');

  readonly items = signal<LatestAuctionItem[]>([
    { id: '1', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '2', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '3', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '4', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '5', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
  ]);

  readonly riyalIconUrl = '/assets/icons/riyal.svg';

  onDownload(): void {}
  onFilter(): void {}
  onViewAll(): void {}
}
