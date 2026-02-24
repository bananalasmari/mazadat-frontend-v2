import { NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

type TypographyTag = 'p' | 'span' | 'div' | 'small' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TypographyVariant = 'body' | 'lead' | 'small' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TypographyWeight = 'light' | 'normal' | 'semibold' | 'bold';
type TypographyAlign = 'start' | 'center' | 'end';
type TypographyTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
type TypographyColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'muted';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet],
  template: `
    <ng-container [ngSwitch]="tag()">
      <p *ngSwitchCase="'p'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></p>
      <span *ngSwitchCase="'span'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></span>
      <div *ngSwitchCase="'div'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></div>
      <small *ngSwitchCase="'small'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></small>
      <label *ngSwitchCase="'label'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></label>

      <h1 *ngSwitchCase="'h1'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></h1>
      <h2 *ngSwitchCase="'h2'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></h2>
      <h3 *ngSwitchCase="'h3'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></h3>
      <h4 *ngSwitchCase="'h4'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></h4>
      <h5 *ngSwitchCase="'h5'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></h5>
      <h6 *ngSwitchCase="'h6'" [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></h6>

      <p *ngSwitchDefault [class]="classes()"><ng-container [ngTemplateOutlet]="content"></ng-container></p>
    </ng-container>

    <ng-template #content>
      @if (text() !== null) {
        {{ text() }}
      } @else {
        <ng-content />
      }
    </ng-template>
  `,
})
export class TypographyComponent {
  readonly tag = input<TypographyTag>('p');
  readonly variant = input<TypographyVariant>('body');
  readonly weight = input<TypographyWeight>('normal');
  readonly muted = input(false);
  readonly color = input<TypographyColor>('default');
  readonly align = input<TypographyAlign>('start');
  readonly transform = input<TypographyTransform>('none');
  readonly truncate = input(false);
  readonly extraClass = input<string>('');

  /**
   * Optional plain-text content. If null, projected content is used.
   */
  readonly text = input<string | null>(null);

  protected classes(): string {
    const classes: string[] = [];

    // Variant
    const v = this.variant();
    if (v === 'lead') classes.push('lead');
    else if (v === 'small') classes.push('small');
    else if (v !== 'body') classes.push(v); // h1..h6 utility classes

    // Weight
    switch (this.weight()) {
      case 'light':
        classes.push('fw-light');
        break;
      case 'semibold':
        classes.push('fw-semibold');
        break;
      case 'bold':
        classes.push('fw-bold');
        break;
      default:
        classes.push('fw-normal');
    }

    // Muted / align / transform
    const color = this.color();
    if (color === 'muted') classes.push('text-muted');
    else if (color !== 'default') classes.push(`text-${color}`);
    else if (this.muted()) classes.push('text-muted');

    classes.push(`text-${this.align()}`);
    const t = this.transform();
    if (t !== 'none') classes.push(`text-${t}`);

    // Truncate needs a constrained container to work; we provide the utility, caller can size.
    if (this.truncate()) classes.push('text-truncate');

    const extra = this.extraClass().trim();
    if (extra) classes.push(extra);

    return classes.join(' ');
  }
}

