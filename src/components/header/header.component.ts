import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink],
})
export default class HeaderComponent {
  // Injection list
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  // State
  isAuthenticated = this.authService.isAuthenticated;

  // Methods
  // Note: Add jsDoc description here
  logout() {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}
