import { Component, signal } from '@angular/core';
import { SummaryCardComponent } from '../../components';
@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  standalone: true,
  imports: [SummaryCardComponent],
})
export default class PurchaseComponent {
  // State
  name = signal('');
  mobile = signal('');
  childName = signal('');
  childDob = signal('');
  gender = signal<'boy' | 'girl'>('boy');
  price = signal(456);
  taxes = signal(4.0);

  // Methods

  // Note: Add jsDoc description here
  addChild() {}

  // Note: Add jsDoc description here
  submit() {}
}
