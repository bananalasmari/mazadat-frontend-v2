import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserDto } from '../models/user.model';

export interface LoginResponse {
  accessToken?: string;
  tokenType?: string;
  authorities?: { authority: string }[];
  passwordExpired?: boolean;
}

/** When true, OTP and post-login are faked (no API calls). Set to false when backend is ready. */
const FAKE_OTP_ENABLED = true;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  /** Dummy login for testing OTP flow: always succeeds after a short delay. */
  login(username: string, password: string): Observable<LoginResponse> {
    return of({} as LoginResponse).pipe(delay(600));
    // return this.http.post<LoginResponse>('/api/auth/login', { username, password });
  }

  validateOtp(credentials: { username: string; password: string }, otp: string): Observable<LoginResponse> {
    if (FAKE_OTP_ENABLED) {
      return of({
        authorities: [{ authority: 'ROLE_USER' }],
      } as LoginResponse).pipe(delay(800));
    }
    return this.http.post<LoginResponse>(`/api/auth/validate/otp?otp_verification=${otp}`, credentials);
  }

  postLogin(authorities: string[]): Observable<void> {
    if (FAKE_OTP_ENABLED) {
      return of(undefined).pipe(delay(300));
    }
    return this.http.post<void>('/api/auth/post-login', authorities);
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {});
  }

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>('/api/v2/user/currentUser');
  }
}
