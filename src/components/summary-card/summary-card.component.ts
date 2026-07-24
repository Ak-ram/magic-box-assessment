import { Component, input } from '@angular/core';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  standalone: true,
})
export default class SummaryCardComponent {
  subtotal = input.required<number>();
  taxes = input.required<number>();
  total = () => this.subtotal() + this.taxes();
}
