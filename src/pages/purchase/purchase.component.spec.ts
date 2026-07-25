import PurchaseComponent from './purchase.component';
import { TestBed } from '@angular/core/testing';
import { PurchaseService } from '../../services/purchase.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let mockAuthService: { isAuthenticated: jasmine.Spy };
  let mockPurchaseService: { draft: jasmine.Spy; saveDraft: jasmine.Spy; clearDraft: jasmine.Spy };
  let mockRouter: { navigate: jasmine.Spy };

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false),
    };
    mockPurchaseService = {
      draft: jasmine.createSpy('draft').and.returnValue(null),
      saveDraft: jasmine.createSpy('saveDraft'),
      clearDraft: jasmine.createSpy('clearDraft'),
    };
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      providers: [
        { provide: PurchaseService, useValue: mockPurchaseService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    const fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
  });

  it('should craete with one empty child as a placeholder', () => {
    expect(component).toBeTruthy();
    expect(component.childrenCount()).toBe(1);
  });

  it('shoudl calculate subtotal and taxes correctly based on children count', () => {
    expect(component.subtotal()).toBe(10);
    expect(component.taxes()).toBe(1);

    component.addChild();

    expect(component.childrenCount()).toBe(2);
    expect(component.subtotal()).toBe(20);
    expect(component.taxes()).toBe(2);
  });

  it('should add new child to the purchase model', () => {
    component.addChild();
    expect(component.purchaseModel().children.length).toBe(2);
    expect(component.purchaseModel().children[1]).toEqual({
      childFullName: '',
      childDOB: '',
      gender: 'boy',
    });
  });

  it('shouldl remove a child from the purchase model', () => {
    component.addChild()
    expect(component.purchaseModel().children.length).toBe(2);

    component.removeChild(0);
    expect(component.purchaseModel().children.length).toBe(1);
  });

  it('should save draft and redirect to login page when user is not authenticated', () => {
    mockAuthService.isAuthenticated.and.returnValue(false);
    component.purchaseModel.set({
      name: 'test',
      mobile: '01234567890',
      children: [{ childFullName: 'test', childDOB: '2015-01-01', gender: 'boy' }],
    });
    component.submit();
    expect(mockPurchaseService.saveDraft).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { redirect: '/purchase' } });
  });

  it('should clear draft when user is authenticated', () => {
    spyOn(window, 'alert');
    mockAuthService.isAuthenticated.and.returnValue(true);
    component.purchaseModel.set({
      name: 'test',
      mobile: '01134567890',
      children: [{ childFullName: 'test', childDOB: '2015-01-01', gender: 'boy' }],
    });
    component.submit();
    expect(mockPurchaseService.clearDraft).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  })
});
