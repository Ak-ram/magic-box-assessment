import { Injectable, signal } from '@angular/core';
import { IPurchaseForm } from '../models/auth.model';
@Injectable({
 providedIn: 'root',
})
export class PurchaseService {
 private readonly storageKey = 'purchaseDraft';
 // State
 draft = signal<IPurchaseForm | null>(this.getStoredDraft());

 // Methods

 // Note: Add jsDoc description here
 saveDraft(data: IPurchaseForm) {
   sessionStorage.setItem(this.storageKey, JSON.stringify(data));
   this.draft.set(data);
 }

 // Note: Add jsDoc description here
 clearDraft() {
   sessionStorage.removeItem(this.storageKey);
   this.draft.set(null);
 }

 // Note: jsDoc need
 private getStoredDraft(): IPurchaseForm | null {
   const stored = sessionStorage.getItem(this.storageKey);
   return stored ? (JSON.parse(stored) as IPurchaseForm) : null;
 }
}
