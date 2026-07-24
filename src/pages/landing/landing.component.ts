import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  standalone: true,
})
export default class LandingComponent {
  // injection list
  private readonly router: Router = inject(Router);

  /**
   * Navigate to purchase page
   *
   * @returns void
   * **/
  goToPurchase(): void {
    this.router.navigate(['/purchase']);
  }
}
