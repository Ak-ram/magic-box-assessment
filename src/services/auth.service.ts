import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ILoginForm, loginResponse, userProfileResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = 'https://dummyjson.com/auth/login';
  userProfileUrl = 'https://dummyjson.com/auth/me';
  refreshTokenUrl = 'https://dummyjson.com/auth/refresh';
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
      .pipe(map((res: Object) => res as loginResponse));
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
}
