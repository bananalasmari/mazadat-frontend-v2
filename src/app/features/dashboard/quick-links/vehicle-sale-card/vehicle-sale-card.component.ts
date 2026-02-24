import { Component, input, output } from '@angular/core';
import type { VehicleSaleQuickAction } from '../../../../core/models/quick-action.model';
import { ButtonComponent } from '../../../../shared/ui/atoms/button/button.component';
import { TagComponent } from '../../../../shared/ui/atoms/tag/tag.component';
import { TypographyComponent } from '../../../../shared/ui/atoms/typography/typography.component';

@Component({
  selector: 'app-quick-link-vehicle-sale-card',
  standalone: true,
  imports: [ButtonComponent, TagComponent, TypographyComponent],
  templateUrl: './vehicle-sale-card.component.html',
})
export class VehicleSaleCardComponent {
  readonly item = input.required<VehicleSaleQuickAction>();
  readonly status = input<'accepted' | 'rejected' | null>(null);
  readonly acceptedLabel = input.required<string>();
  readonly rejectedLabel = input.required<string>();
  readonly demoCarImage = input.required<string>();

  readonly rejectSale = output<VehicleSaleQuickAction>();
  readonly acceptSale = output<VehicleSaleQuickAction>();
}
