import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ILoginForm, ILoginResponse, IUserProfileResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Injection list
  private readonly http: HttpClient = inject(HttpClient);

  // Dummy JSON Urls
  private readonly loginUrl = 'https://dummyjson.com/auth/login';
  private readonly userProfileUrl = 'https://dummyjson.com/auth/me';
  private readonly refreshTokenUrl = 'https://dummyjson.com/auth/refresh';

  // State
  private readonly accessToken = signal(
    localStorage.getItem('accessToken') ?? sessionStorage.getItem('accessToken'),
  );
  isAuthenticated = computed(() => !!this.accessToken());

  /**
   * Auth user to return access token & store it in local storage
   *
   * @param loginForm
   * @returns Observable<ILoginResponse>
   * **/
  login(loginForm?: ILoginForm, rememberMe: boolean = false): Observable<ILoginResponse> {
    const body = JSON.stringify({
      ...loginForm,
      expiresInMins: 1,
    });
    return this.http
      .post(this.loginUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
      })
      .pipe(
        map((res: Object) => res as ILoginResponse),
        tap((res) => this.setAccessToken(res.accessToken, rememberMe)),
      );
  }

  /**
   * Get authenticated user profile
   * @param accessToken
   * @returns Observable<IUserProfileResponse>
   **/
  getUserProfile(accessToken: string): Observable<Object> {
    return this.http
      .get(this.userProfileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: 'include',
        },
      })
      .pipe(map((res: Object) => res as IUserProfileResponse));
  }

  /**
   * Refresh access token
   * @param refreshToken
   * @returns Observable<ILoginResponse>
   **/
  refreshToken(refreshToken: string): Observable<Object> {
    const body = JSON.stringify({
      refreshToken: '/* YOUR_REFRESH_TOKEN_HERE */',
      expiresInMins: 30,
    });
    return this.http
      .post(this.refreshTokenUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
      })
      .pipe(map((res: Object) => res as ILoginResponse));
  }

  /**
   * Persists access token in local storage
   * @param accessToken
   * @param rememberMe
   * @returns void
   **/
  private setAccessToken(accessToken: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      sessionStorage.setItem('accessToken', accessToken);
    }
    this.accessToken.set(accessToken);
  }

  /**
   * Clears access token from local storage
   *
   * @returns void
   **/
  logout(): void {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    this.accessToken.set(null);
  }
}
