import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';

export interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  date?: string;
  read?: boolean;
}

@Component({
  selector: 'app-notification-button',
  standalone: true,
  imports: [ButtonModule, OverlayBadgeModule, TooltipModule],
  template: `
    <div class="notification-button relative">
      <p-overlaybadge [value]="count()" severity="danger">
        <p-button
          icon="pi pi-bell"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          [pTooltip]="tooltipLabel()"
          (onClick)="togglePanel($event)"
          [attr.aria-label]="tooltipLabel()"
          [attr.aria-expanded]="panelOpen()"
          [attr.aria-haspopup]="'true'"
        />
      </p-overlaybadge>

      @if (panelOpen()) {
        <div
          class="notification-button__panel"
          role="dialog"
          [attr.aria-label]="panelTitle()"
        >
          <div class="notification-button__panel-header">
            <span class="notification-button__panel-title">{{ panelTitle() }}</span>
          </div>
          <div class="notification-button__panel-body">
            @if (notifications().length > 0) {
              <ul class="notification-button__list" role="list">
                @for (item of notifications(); track item.id) {
                  <li
                    class="notification-button__item"
                    [class.notification-button__item--unread]="!item.read"
                    role="button"
                    tabindex="0"
                    (click)="onNotificationClick(item); $event.stopPropagation()"
                    (keydown.enter)="onNotificationClick(item); $event.preventDefault()"
                    (keydown.space)="onNotificationClick(item); $event.preventDefault()"
                  >
                    <div class="notification-button__item-title">{{ item.title }}</div>
                    @if (item.message) {
                      <div class="notification-button__item-message">{{ item.message }}</div>
                    }
                    @if (item.date) {
                      <div class="notification-button__item-date">{{ item.date }}</div>
                    }
                  </li>
                }
              </ul>
            } @else {
              <div class="notification-button__empty" role="status">
                <i class="pi pi-bell notification-button__empty-icon" aria-hidden="true"></i>
                <p class="notification-button__empty-text">{{ emptyMessage() }}</p>
              </div>
            }
          </div>
        </div>
        <button
          type="button"
          class="notification-button__backdrop"
          aria-label="Close"
          (click)="closePanel()"
        ></button>
      }
    </div>
  `,
  styles: [
    `
      .notification-button {
        position: relative;
        display: inline-block;
      }
      /* Mobile: full-width panel below header, fixed so it stays in viewport */
      .notification-button__panel {
        position: fixed;
        left: 0.5rem;
        right: 0.5rem;
        top: 4rem;
        width: auto;
        min-width: 0;
        max-width: none;
        max-height: min(24rem, 70vh);
        background: var(--p-content-background, #fff);
        border: 1px solid var(--p-content-border-color, #e5e7eb);
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 1100;
        display: flex;
        flex-direction: column;
      }
      @media (min-width: 640px) {
        .notification-button__panel {
          position: absolute;
          left: auto;
          right: 0;
          top: calc(100% + 0.5rem);
          min-width: 20rem;
          max-width: 24rem;
          max-height: 24rem;
        }
      }
      [dir='rtl'] .notification-button__panel {
        left: 0.5rem;
        right: 0.5rem;
      }
      @media (min-width: 640px) {
        [dir='rtl'] .notification-button__panel {
          left: 0;
          right: auto;
        }
      }
      .notification-button__panel-header {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--p-content-border-color, #e5e7eb);
        flex-shrink: 0;
      }
      .notification-button__panel-title {
        font-weight: 600;
        font-size: 0.9375rem;
      }
      .notification-button__panel-body {
        overflow-y: auto;
        padding: 0.5rem;
      }
      .notification-button__list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .notification-button__item {
        padding: 0.75rem;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .notification-button__item:hover {
        background: var(--p-content-hover-background, #f3f4f6);
      }
      .notification-button__item--unread {
        background: var(--p-highlight-background, rgba(36, 32, 91, 0.08));
      }
      .notification-button__item-title {
        font-weight: 500;
        font-size: 0.875rem;
      }
      .notification-button__item-message {
        font-size: 0.8125rem;
        color: #6b7280;
        margin-top: 0.25rem;
      }
      .notification-button__item-date {
        font-size: 0.75rem;
        color: #9ca3af;
        margin-top: 0.25rem;
      }
      .notification-button__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        text-align: center;
      }
      .notification-button__empty-icon {
        font-size: 2rem;
        color: #d1d5db;
        margin-bottom: 0.75rem;
      }
      .notification-button__empty-text {
        margin: 0;
        font-size: 0.875rem;
        color: #6b7280;
      }
      .notification-button__backdrop {
        position: fixed;
        inset: 0;
        background: transparent;
        z-index: 1099;
        border: none;
        cursor: default;
      }
    `,
  ],
})
export class NotificationButtonComponent {
  /** Number to show in the badge (0 or null hides badge). */
  readonly count = input<number>(0);
  /** Tooltip and aria-label text (e.g. "Notifications"). */
  readonly tooltipLabel = input<string>('Notifications');
  /** Title shown at the top of the panel. */
  readonly panelTitle = input<string>('Notifications');
  /** Message shown when there are no notifications. */
  readonly emptyMessage = input<string>('No notifications yet');
  /** List of notifications to display. */
  readonly notifications = input<NotificationItem[]>([]);

  readonly clicked = output<void>();
  /** Emitted when the user clicks a notification item (payload: the item). */
  readonly notificationClick = output<NotificationItem>();

  readonly panelOpen = signal(false);

  togglePanel(event: Event): void {
    event.stopPropagation();
    this.panelOpen.update((v) => !v);
    this.clicked.emit();
  }

  closePanel(): void {
    this.panelOpen.set(false);
  }

  onNotificationClick(item: NotificationItem): void {
    this.notificationClick.emit(item);
    this.closePanel();
  }
}
