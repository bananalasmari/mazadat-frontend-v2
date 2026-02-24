import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';

export interface ActiveListingItem {
  id: string;
  price: string;
  carName: string;
  idDate: string;
  imageUrl: string;
}

const DEMO_IMAGE = '/assets/images/demo-car.jpeg';

@Component({
  selector: 'app-active-listings',
  standalone: true,
  imports: [TypographyComponent],
  templateUrl: './active-listings.component.html',
})
export class ActiveListingsComponent {
  private readonly i18n = inject(TranslationService);

  readonly title = () => this.i18n.t('dashboard.activeListings.title');
  readonly subtitle = () => this.i18n.t('dashboard.activeListings.subtitle');
  readonly viewAllLabel = () => this.i18n.t('dashboard.activeListings.viewAll');
  readonly downloadLabel = () => this.i18n.t('dashboard.activeListings.download');
  readonly filterLabel = () => this.i18n.t('dashboard.activeListings.filter');

  readonly items = signal<ActiveListingItem[]>([
    { id: '1', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '2', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '3', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '4', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
    { id: '5', price: '65,000', carName: 'Toyota Camry 2024', idDate: '#5643 • 12-10-2024', imageUrl: DEMO_IMAGE },
  ]);

  readonly riyalIconUrl = '/assets/icons/riyal.svg';

  onDownload(): void {
    // TODO
  }

  onFilter(): void {
    // TODO
  }

  onViewAll(): void {
    // TODO
  }
}
