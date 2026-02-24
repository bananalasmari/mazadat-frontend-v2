import { Injectable, signal, computed } from '@angular/core';

/** Holds username/password temporarily when navigating from login to OTP page. */
@Injectable({ providedIn: 'root' })
export class OtpCredentialsService {
  private readonly creds = signal<{ username: string; password: string } | null>(null);

  readonly credentials = computed(() => this.creds());

  set(username: string, password: string): void {
    this.creds.set({ username, password });
  }

  get(): { username: string; password: string } | null {
    return this.creds();
  }

  clear(): void {
    this.creds.set(null);
  }
}
