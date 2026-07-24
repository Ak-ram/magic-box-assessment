import { Component, inject, signal } from '@angular/core';
import { SummaryCardComponent } from '../../components';
import { form, FormField, required, email, minLength, maxLength, pattern } from '@angular/forms/signals';
import { IPurchaseForm } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  standalone: true,
  imports: [SummaryCardComponent, FormField],
})
export default class PurchaseComponent {
  // Injection list
  private readonly authService = inject(AuthService);
  private readonly purchaseService = inject(PurchaseService);
  private readonly router = inject(Router);

  // State
  purchaseModel = signal<IPurchaseForm>(
    this.purchaseService.draft() ?? { name: '', mobile: '', children: [
      { childFullName: '', childDOB: '', gender: 'boy' },
      ] },
  );
  purchaseForm = form(this.purchaseModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.mobile, { message: 'Mobile is required' });
    // maxLength(schemaPath.mobile, 11, { message: 'Mobile must be at most 11 characters' });
    pattern(schemaPath.mobile, /^01\d{9}$/, { message: 'Mobile must be 11 digits starting with 01' });
  });
  price = signal(456);
  taxes = signal(4.0);

  // Methods

  // Note: Add jsDoc description here
  addChild() {
    this.purchaseModel().children.push({ childFullName: '', childDOB: '', gender: 'boy' });
  }
  // Note: Add jsDoc description here
  submit() {
    if (this.purchaseForm().invalid()) {
      return;
    }
    if (!this.authService.isAuthenticated()) {
      this.purchaseService.saveDraft(this.purchaseModel());
      this.router.navigate(['/login'], { queryParams: { redirect: '/purchase' } });
    }
    this.purchaseService.clearDraft();
    console.log('submitting purchase', this.purchaseModel());
  }
}
