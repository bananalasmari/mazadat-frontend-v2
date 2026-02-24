import { Component, input, output } from '@angular/core';
import type { VehicleDuesQuickAction } from '../../../../core/models/quick-action.model';
import { ButtonComponent } from '../../../../shared/ui/atoms/button/button.component';
import { TypographyComponent } from '../../../../shared/ui/atoms/typography/typography.component';

@Component({
  selector: 'app-quick-link-vehicle-dues-card',
  standalone: true,
  imports: [ButtonComponent, TypographyComponent],
  templateUrl: './vehicle-dues-card.component.html',
})
export class VehicleDuesCardComponent {
  readonly item = input.required<VehicleDuesQuickAction>();
  readonly continueRegistration = output<string>();
}
