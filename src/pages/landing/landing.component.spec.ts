import LandingComponent from './landing.component';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let mockRouter: { navigate: jasmine.Spy };

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    });

    const fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to purchase page when goToPurchase is called', () => {
    component.goToPurchase();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/purchase']);
  });
});
