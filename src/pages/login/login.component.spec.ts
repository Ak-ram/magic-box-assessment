import LoginComponent from './login.component';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockAuthService: { login: jasmine.Spy };
  let mockRouter: { navigate: jasmine.Spy };

  beforeEach(() => {
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({ accessToken: 'test-access-token' })),
    };
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call authService.login when form is invalid', () => {
    component.loginModal.set({ username: '', password: '' });
    component.submit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('shoudl call authService.login with form data and rememberMe when form is valid', () => {
    component.rememberMe.set(true);
    component.submit();
    expect(mockAuthService.login).toHaveBeenCalledWith(component.loginModal(), true);
  });

  it('should navigate to /landing by default after login', () => {
    component.submit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/landing']);
  });

  it('should set showSpinner to false after login', () => {
    component.submit();
    expect(component.showSpinner()).toBe(false);
  })
});
