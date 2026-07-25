import { PurchaseService } from './purchase.service';
import { IPurchaseForm } from '../models/auth.model';
import { TestBed } from '@angular/core/testing';

describe('PurchaseService', () => {
  let service: PurchaseService;

  const mockDraft: IPurchaseForm = {
    name: 'Akram Ashraf',
    mobile: '0123456789',
    children: [{ childFullName: 'ali', childDOB: '2015-01-01', gender: 'boy' }],
  };

  beforeEach(() => {
    sessionStorage.clear();

    TestBed.configureTestingModule({
      providers: [PurchaseService],
    });
    service = TestBed.inject(PurchaseService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
