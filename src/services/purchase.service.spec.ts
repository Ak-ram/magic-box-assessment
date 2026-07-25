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

  it('should have null draft initially when session-storage is emtpy', () => {
    expect(service.draft()).toBeNull();
  });

  it('should save draft to session-storage', () => {
    service.saveDraft(mockDraft);
    expect(service.draft()).toEqual(mockDraft);
    expect(sessionStorage.getItem('purchase-draft')).toBeTruthy();
  });

  it('should clear draft from session-storage', () => {
    service.saveDraft(mockDraft);
    expect(service.draft()).toEqual(mockDraft);

    service.clearDraft();

    expect(service.draft()).toBeNull();
    expect(sessionStorage.getItem('purchase-draft')).toBeFalsy();
  });
});
