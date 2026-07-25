import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start as not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should store access token in session-storage when rememberMe is false', () => {
    service.login({ username: 'emilys', password: 'emilyspass' }, false).subscribe();

    const req = httpMock.expectOne('https://dummyjson.com/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ accessToken: 'test-access-token' });

    expect(service.isAuthenticated()).toBe(true);
    expect(sessionStorage.getItem('accessToken')).toBe('test-access-token');
    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('should store access token in local storage when rememberMe is true', () => {
    service.login({ username: 'emilys', password: 'emilyspass' }, true).subscribe();
    const req = httpMock.expectOne('https://dummyjson.com/auth/login');
    req.flush({ accessToken: 'test-access-token' });
    expect(localStorage.getItem('accessToken')).toBe('test-access-token');
    expect(sessionStorage.getItem('accessToken')).toBeNull();
  });

  it('should clear both storages (session, locale) when logout is called', () => {
    service.login({ username: 'emilys', password: 'emilyspass' }, true).subscribe();
    const req = httpMock.expectOne('https://dummyjson.com/auth/login');
    req.flush({ accessToken: 'test-access-token' });

    expect(service.isAuthenticated()).toBe(true);

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(sessionStorage.getItem('accessToken')).toBeNull();
  });
});
