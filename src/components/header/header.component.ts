import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUserProfileResponse } from '../../models/auth.model';
import { PurchaseService } from '../../services/purchase.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink],
})
export default class HeaderComponent {
  // Injection list
  private readonly authService: AuthService = inject(AuthService);
  private readonly purchaseService = inject(PurchaseService);
  private readonly router: Router = inject(Router);

  // State
  isAuthenticated = this.authService.isAuthenticated;
  profile: WritableSignal<IUserProfileResponse | null> = signal(null);

  constructor() {
    effect(() => {
      this.authService.getUserProfile().subscribe({
        next: (profile: Object): void => {
          this.profile.set(profile as IUserProfileResponse);
          console.log('res', profile);
        },
      });
    });
  }
  /**
   * Logout user and navigate to landing page
   *
   * @returns void
   * **/
  logout(): void {
    this.authService.logout();
    this.purchaseService.clearDraft();
    this.router.navigate(['/landing']);
  }
}
