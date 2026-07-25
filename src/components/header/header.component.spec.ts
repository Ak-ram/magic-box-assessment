import { HeaderComponent } from '../index';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { PurchaseService } from '../../services/purchase.service';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let mockAuthService: {
    isAuthenticated: jasmine.Spy;
    getUserProfile: jasmine.Spy;
    logout: jasmine.Spy;
  };
  let mockPurchaseService: { clearDraft: jasmine.Spy };
  let mockRouter: { navigate: jasmine.Spy; url: string };

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false),
      getUserProfile: jasmine
        .createSpy('getUserProfile')
        .and.returnValue(of({ firstName: 'Emily' })),
      logout: jasmine.createSpy('logout'),
    };
    mockPurchaseService = {
      clearDraft: jasmine.createSpy('clearDraft'),
    };
    mockRouter = { navigate: jasmine.createSpy('navigate'), url: '/landing' };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: PurchaseService, useValue: mockPurchaseService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect isAuthenticted from AuthService', () => {
    expect(component.isAuthenticated).toBe(false);
  });

  it('shuold identify the login route correctly', () => {
    mockRouter.url = '/login';
    expect(component.isLoginRoute).toBe(true);

    mockRouter.url = '/purchase';
    expect(component.isLoginRoute).toBe(false);
  });
  it('should logout user and clear draft when logout is called', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockPurchaseService.clearDraft).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/landing']);
  });
});
