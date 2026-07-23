import { Component, input } from '@angular/core';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  standalone: true,
})
export default class SummaryCardComponent {
  price = input.required<number>();
  taxes = input.required<number>();
  total = () => this.price() + this.taxes();
}
