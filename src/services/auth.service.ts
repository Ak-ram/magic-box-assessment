import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ILoginForm, loginResponse, userProfileResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = 'https://dummyjson.com/auth/login';
  private readonly userProfileUrl = 'https://dummyjson.com/auth/me';
  private readonly refreshTokenUrl = 'https://dummyjson.com/auth/refresh';
  private readonly accessToken = signal(localStorage.getItem('accessToken'));
  isAuthenticated = computed(() => !!this.accessToken());
  // Injection list
  private readonly http: HttpClient = inject(HttpClient);

  login(loginForm?: ILoginForm): Observable<loginResponse> {
    const body = JSON.stringify({
      ...loginForm,
      expiresInMins: 30,
    });
    return this.http
      .post(this.loginUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
      })
      .pipe(
        map((res: Object) => res as loginResponse),
        tap((res) => this.setAccessToken(res.accessToken)),
      );
  }

  getUserProfile(accessToken: string): Observable<Object> {
    return this.http
      .get(this.userProfileUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          credentials: 'include',
        },
      })
      .pipe(map((res: Object) => res as userProfileResponse));
  }

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
      .pipe(map((res: Object) => res as loginResponse));
  }

  private setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
    this.accessToken.set(accessToken);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.accessToken.set(null);
  }
}
