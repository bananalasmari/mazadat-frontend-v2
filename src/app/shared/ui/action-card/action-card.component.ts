import { Component, input, output } from '@angular/core';
import { TypographyComponent } from '../atoms/typography/typography.component';
import { ButtonComponent } from '../atoms/button/button.component';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [TypographyComponent, ButtonComponent],
  templateUrl: './action-card.component.html',
  styleUrl: './action-card.component.scss',
})
export class ActionCardComponent {
  /** Card title (e.g. "إضافة مركبة") */
  readonly title = input.required<string>();
  /** Description text below the title */
  readonly description = input.required<string>();
  /** Primary button label (e.g. "إضافة المركبة") */
  readonly buttonLabel = input.required<string>();
  /** Icon CSS class for the top icon box (e.g. PrimeIcons "pi pi-plus"). Default: "pi pi-plus" */
  readonly icon = input<string>('pi pi-plus');

  /** Emitted when the primary button is clicked */
  readonly buttonClicked = output<void>();
}
