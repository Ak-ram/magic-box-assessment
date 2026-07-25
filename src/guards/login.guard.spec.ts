import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { loginGuard } from './login.guard';

describe('LoginGuard:', () => {
  let mockAuthService: { isAuthenticated: jasmine.Spy };
  let mockRouter: { navigate: jasmine.Spy };

  beforeEach(() => {
    mockAuthService = { isAuthenticated: jasmine.createSpy('isAuthenticated') };
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('no auth user : shoudl allow access ot the login page when user is not authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));
    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  })

  it('auth user : should block access and redirect to landing page when user is authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(true);

    const resutl = TestBed.runInInjectionContext(() => loginGuard({} as any, {} as any));

    expect(resutl).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['./landing']);
  })
});
