import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStateService } from '../../../core/auth/auth-state.service';

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [],
  template: `
    @if (showLogoutConfirm()) {
      <div class="modal-overlay" (click)="cancelLogout()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to logout?</p>
          <div class="modal-actions">
            <button class="modal-btn modal-btn-cancel" (click)="cancelLogout()">Cancel</button>
            <button class="modal-btn modal-btn-confirm" (click)="executeLogout()">Logout</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }

    .modal h2 {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      color: oklch(19.37% 0.006 300.98);
    }

    .modal p {
      margin: 0 0 1.5rem 0;
      color: oklch(36.98% 0.014 302.71);
    }

    .modal-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .modal-btn {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .modal-btn-cancel {
      background: transparent;
      color: oklch(36.98% 0.014 302.71);
      border: 1px solid oklch(70.9% 0.015 304.04);
    }

    .modal-btn-cancel:hover {
      background: oklch(70.9% 0.015 304.04);
      color: white;
    }

    .modal-btn-confirm {
      background: oklch(55% 0.25 25);
      color: white;
      border: none;
    }

    .modal-btn-confirm:hover {
      opacity: 0.9;
    }
  `,
})
export class AuthContainerComponent {
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  protected readonly showLogoutConfirm = signal(false);

  openLogin(): void {
    void this.router.navigateByUrl('/login');
  }

  confirmLogout(): void {
    this.showLogoutConfirm.set(true);
  }

  protected cancelLogout(): void {
    this.showLogoutConfirm.set(false);
  }

  protected executeLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.showLogoutConfirm.set(false);
        this.authState.clearUser();
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Logout failed:', err);
        // Still clear user on error - they wanted to logout
        this.showLogoutConfirm.set(false);
        this.authState.clearUser();
        window.location.href = '/';
      },
    });
  }
}
