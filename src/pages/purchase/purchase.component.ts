import { Component, computed, inject, signal } from '@angular/core';
import { SummaryCardComponent } from '../../components';
import {
  form,
  FormField,
  required,
  maxLength,
  applyEach,
  validate,
  pattern,
} from '@angular/forms/signals';
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
  readonly boxPrice = 10;
  readonly boxTax = 1;
  childrenCount = computed(() => this.purchaseModel().children.length);
  subtotal = computed(() => this.boxPrice * this.childrenCount());
  taxes = computed(() => this.boxTax * this.childrenCount());
  purchaseModel = signal<IPurchaseForm>(
    this.purchaseService.draft() ?? {
      name: '',
      mobile: '',
      children: [{ childFullName: '', childDOB: '', gender: '' as 'boy' }],
    },
  );
  purchaseForm = form(this.purchaseModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.mobile, { message: 'Mobile is required' });
    maxLength(schemaPath.mobile, 11, { message: 'Mobile must be 11 digits' });
    pattern(schemaPath.mobile, /^01\d{9}$/, {
      message: 'Mobile must be 11 digits starting with 01',
    });
    applyEach(schemaPath.children, (child) => {
      required(child.childFullName, { message: 'Child name is required' });
      required(child.childDOB, { message: 'Date of birth is required' });

      validate(child.childDOB, ({ value }) => {
        const dob = new Date(value());
        const sevenYearsAgo = new Date();
        sevenYearsAgo.setFullYear(sevenYearsAgo.getFullYear() - 7);
        return dob <= sevenYearsAgo
          ? null
          : { kind: 'minAge', message: 'Child must be at least 7 years old' };
      });
    });
  });

  /**
   * Add a new child to the purchase model
   *
   * @returns void
   * **/
  addChild(): void {
    this.purchaseModel.update((current) => ({
      ...current,
      children: [...current.children, { childFullName: '', childDOB: '', gender: 'boy' }],
    }));
  }

  /**
   * Remove a child from the purchase model
   *
   * @param index number
   * @returns void
   * **/
  removeChild(index: number): void {
    this.purchaseModel.update((current) => ({
      ...current,
      children: current.children.filter((_, i) => i !== index),
    }));
  }

  /**
   * Submit the purchase form
   *
   * @returns void
   * **/
  submit(): void {
    if (this.purchaseForm().invalid()) {
      return;
    }
    if (!this.authService.isAuthenticated()) {
      this.purchaseService.saveDraft(this.purchaseModel());
      this.router.navigate(['/login'], { queryParams: { redirect: '/purchase' } });
      return;
    }
    this.purchaseService.clearDraft();
    window.alert('Purchase submitted successfully!');
    console.log('submitting purchase', this.purchaseModel());
  }
}
