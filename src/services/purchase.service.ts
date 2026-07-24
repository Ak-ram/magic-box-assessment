import { Injectable, signal } from '@angular/core';
import { IPurchaseForm } from '../models/auth.model';
@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  // State
  private readonly storageKey = 'purchase-draft';
  draft = signal<IPurchaseForm | null>(this.getStoredDraft());

  /**
   * Saves the draft to session storage
   * @param data IPurchaseForm
   * @returns void
   * **/
  saveDraft(data: IPurchaseForm): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
    this.draft.set(data);
  }

  /**
   * Clears the draft from session storage
   *
   * @returns void
   * **/
  clearDraft(): void {
    sessionStorage.removeItem(this.storageKey);
    this.draft.set(null);
  }

  /**
   * Retrieves the draft from session storage
   * @returns IPurchaseForm | null
   * **/
  private getStoredDraft(): IPurchaseForm | null {
    const stored = sessionStorage.getItem(this.storageKey);
    return stored ? (JSON.parse(stored) as IPurchaseForm) : null;
  }
}
