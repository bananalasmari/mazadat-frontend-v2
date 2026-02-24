import { Component, input, output } from '@angular/core';
import { MessageModule } from 'primeng/message';

export type AlertSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
export type AlertVariant = 'default' | 'outlined' | 'simple' | 'text';
export type AlertSize = 'small' | 'large' | undefined;

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MessageModule],
  template: `
    @if (visible()) {
      <p-message
        [severity]="severity()"
        [icon]="resolvedIcon()"
        [variant]="messageVariant()"
        [size]="size()"
        [closable]="closable()"
        [life]="life()"
        (close)="onClose()"
        [styleClass]="extraClass()"
      >
        @if (text()) {
          {{ text() }}
        } @else {
          <ng-content />
        }
      </p-message>
    }
  `,
})
export class AlertComponent {
  /** Severity: success, info, warn, error, secondary, contrast */
  readonly severity = input<AlertSeverity>('info');
  /** PrimeIcons class (e.g. "pi pi-check-circle"). If not set, a default icon per severity is used. */
  readonly icon = input<string | null>(null);
  /** Display variant: default, outlined, simple, text */
  readonly variant = input<AlertVariant>('default');
  readonly size = input<AlertSize>(undefined);
  /** Message text (alternative to projected content) */
  readonly text = input<string>('');
  /** Show close button */
  readonly closable = input(false);
  /** Auto-close after this many ms (0 = no auto-close) */
  readonly life = input<number>(0);
  /** Extra CSS classes for the message root */
  readonly extraClass = input<string>('');
  /** When false, message is not rendered (e.g. for conditional alerts) */
  readonly visible = input(true);

  readonly closed = output<void>();

  protected messageVariant(): 'outlined' | 'simple' | 'text' | undefined {
    const v = this.variant();
    return v === 'default' ? undefined : v;
  }

  protected resolvedIcon(): string {
    const custom = this.icon();
    if (custom) return custom;
    const defaults: Record<AlertSeverity, string> = {
      success: 'pi pi-check-circle',
      info: 'pi pi-info-circle',
      warn: 'pi pi-exclamation-triangle',
      error: 'pi pi-times-circle',
      secondary: 'pi pi-tag',
      contrast: 'pi pi-info-circle',
    };
    return defaults[this.severity()];
  }

  protected onClose(): void {
    this.closed.emit();
  }
}
