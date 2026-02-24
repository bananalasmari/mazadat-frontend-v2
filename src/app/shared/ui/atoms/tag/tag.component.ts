import { Component, input } from '@angular/core';
import { Tag } from 'primeng/tag';

export type TagSeverity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [Tag],
  template: `
    <p-tag
      [value]="value()"
      [severity]="severity()"
      [icon]="icon() ?? undefined"
      [rounded]="rounded()"
      [styleClass]="extraClass()"
    />
  `,
})
export class TagComponent {
  /** Text shown in the tag */
  readonly value = input.required<string>();
  /** Severity: success, secondary, info, warn, danger, contrast */
  readonly severity = input<TagSeverity>('secondary');
  /** PrimeIcons class (e.g. "pi pi-star-fill") */
  readonly icon = input<string | null>(null);
  /** Rounded pill style */
  readonly rounded = input(true);
  /** Extra CSS classes for the tag root */
  readonly extraClass = input('');
}
