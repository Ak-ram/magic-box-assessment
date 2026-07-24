import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  standalone: true,
})
export default class SummaryCardComponent {
  subtotal = input.required<number>();
  taxes = input.required<number>();
  childrenCount = input.required<number>();
  children = computed(() => Array(this.childrenCount()).fill(0));
  total = () => this.subtotal() + this.taxes();
}
