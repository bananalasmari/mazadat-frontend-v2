import { Component, input, output } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'gray'
  | 'success'
  | 'danger'
  | 'outline-success'
  | 'outline-danger';
type ButtonType = 'button' | 'submit' | 'reset';
type IconPosition = 'start' | 'end';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  host: { style: 'display: contents;' },
  template: `
    <button
      [attr.type]="type()"
      [attr.aria-label]="computedAriaLabel()"
      [attr.aria-busy]="loading() ? 'true' : null"
      [class]="bootstrapClass()"
      [disabled]="disabled() || loading()"
      (click)="clicked.emit()"
    >
      @if (loading()) {
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      }

      @if (icon() && iconPosition() === 'start') {
        <i [class]="icon()" aria-hidden="true"></i>
      }

      @if (!iconOnly()) {
        <span class="px-1">{{ label() }}</span>
      }

      @if (icon() && iconPosition() === 'end') {
        <i [class]="icon()" aria-hidden="true"></i>
      }
    </button>
  `,
})
export class ButtonComponent {
  readonly label = input<string>('Button');
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<ButtonType>('button');
  readonly size = input<ButtonSize>('lg');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly extraClass = input<string>('');
  /**
   * CSS class list for the icon element.
   * - PrimeIcons example: `pi pi-check`
   * - Font Awesome example: `fa-solid fa-user`
   */
  readonly icon = input<string | null>(null);
  readonly iconPosition = input<IconPosition>('start');
  readonly iconOnly = input(false);
  /**
   * Accessibility label for icon-only buttons (recommended whenever `iconOnly` is true).
   */
  readonly ariaLabel = input<string | null>(null);

  readonly clicked = output<void>();

  protected computedAriaLabel(): string | null {
    if (!this.iconOnly()) return this.ariaLabel();
    return this.ariaLabel() ?? this.label();
  }

  protected bootstrapClass(): string {
    const v = this.variant();
    const sz = this.size();
    const sizeClass = sz === 'sm' ? 'btn-sm' : sz === 'lg' ? 'btn-lg' : '';
    const base = `btn gap-2 px-2 ${sizeClass}`.trim();
    const extra = this.extraClass().trim();
    switch (v) {
      case 'primary':
        return `${base} btn-primary ${extra}`.trim();
      case 'secondary':
        return `${base} btn-secondary ${extra}`.trim();
      case 'outline':
        return `${base} btn-outline-secondary ${extra}`.trim();
      case 'gray':
        return `${base} btn-light text-dark border ${extra}`.trim();
      case 'success':
        return `${base} btn-success ${extra}`.trim();
      case 'danger':
        return `${base} btn-danger ${extra}`.trim();
      case 'outline-success':
        return `${base} btn-outline-success ${extra}`.trim();
      case 'outline-danger':
        return `${base} btn-outline-danger ${extra}`.trim();
      default:
        return `${base} btn-secondary ${extra}`.trim();
    }
  }
}

