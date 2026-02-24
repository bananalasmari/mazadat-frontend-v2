import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './auth.service';
import { UserDto } from '../models/user.model';
import { Subject, catchError, finalize, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private fetchUser$ = new Subject<void>();

  readonly user = signal<UserDto | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.fetchUser$
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap(() =>
          this.authService.getCurrentUser().pipe(
            tap((user) => this.user.set(user)),
            catchError((err) => {
              console.error('Failed to load user:', err);
              this.user.set(null);
              this.error.set('Not authenticated');
              return of(null as UserDto | null);
            }),
            finalize(() => this.loading.set(false)),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  fetchUser(): void {
    this.fetchUser$.next();
  }

  clearUser(): void {
    this.user.set(null);
  }
}
