import { SummaryCardComponent } from '../index';
import { TestBed } from '@angular/core/testing';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SummaryCardComponent],
    });
    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
