import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-user-menu-button',
  standalone: true,
  imports: [ButtonModule, AvatarModule],
  template: `
    <div class="d-flex align-items-center gap-2 user-menu-button">
      <p-avatar
        [label]="initials()"
        shape="circle"
        styleClass="user-menu-button__avatar"
      />
      <p-button
        [label]="displayName()"
        icon="pi pi-chevron-down"
        iconPos="left"
        [text]="true"
        severity="secondary"
        (onClick)="openMenu.emit($event)"
        [attr.aria-haspopup]="'menu'"
        [attr.aria-expanded]="menuVisible()"
        class="d-none d-sm-inline-flex align-items-center user-menu-button__name-btn"
      />
      <p-button
        icon="pi pi-chevron-down"
        iconPos="left"
        [rounded]="true"
        [text]="true"
        severity="secondary"
        (onClick)="openMenu.emit($event)"
        class="d-sm-none"
        [attr.aria-label]="profileLabel()"
      />
    </div>
  `,
  styles: [
    `
      .user-menu-button__avatar {
        background-color: var(--p-primary-color, #0d6efd) !important;
        color: white !important;
      }
      .user-menu-button__name-btn {
        color: #495057;
        font-weight: 400;
      }
    `,
  ],
})
export class UserMenuButtonComponent {
  /** User display name (e.g. "Ahmed Mohamed"). */
  readonly displayName = input<string>('');
  /** Initials for the avatar (e.g. "AM"). */
  readonly initials = input<string>('?');
  /** Aria-label for the icon-only button (e.g. "Profile"). */
  readonly profileLabel = input<string>('Profile');
  /** Whether the menu is currently open (for aria-expanded). */
  readonly menuVisible = input<boolean>(false);

  /** Emitted when the user clicks to open the menu. Pass the event to menu.toggle($event). */
  readonly openMenu = output<Event>();
}
