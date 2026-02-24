import { Component, input, output } from '@angular/core';
import type { SalesAgreementQuickAction } from '../../../../core/models/quick-action.model';
import { ButtonComponent } from '../../../../shared/ui/atoms/button/button.component';
import { TagComponent } from '../../../../shared/ui/atoms/tag/tag.component';
import { TypographyComponent } from '../../../../shared/ui/atoms/typography/typography.component';

@Component({
  selector: 'app-quick-link-sales-agreement-card',
  standalone: true,
  imports: [ButtonComponent, TagComponent, TypographyComponent],
  templateUrl: './sales-agreement-card.component.html',
})
export class SalesAgreementCardComponent {
  readonly item = input.required<SalesAgreementQuickAction>();
  readonly reviewAgreement = output<string>();
}
