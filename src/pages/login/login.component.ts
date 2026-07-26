import { Component, inject, input, signal } from '@angular/core';
import { ILoginForm } from '../../models/auth.model';
import { form, FormField, required, minLength } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormField],
})
export default class LoginComponent {
  // Injection list
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  // State
  redirect = input<string>();
  showSpinner = signal<boolean>(false);
  rememberMe = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  loginModal = signal<ILoginForm>({
    username: 'emilys',
    password: 'emilyspass',
  });
  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.username, { message: 'Username is required' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.username, 3, { message: 'Username must be at least 3 characters' });
    minLength(schemaPath.password, 6, { message: 'Password must be at least 6 characters' });
  });

  /**
   * Submit the login form
   *
   * @returns void**/
  submit(): void {
    this.showSpinner.set(true);
    this.errorMessage.set(null);
    if (this.loginForm().valid()) {
      this.authService.login(this.loginModal(), this.rememberMe()).subscribe({
        next: () => {
          this.showSpinner.set(false);
          const redirectUrl = this.redirect() || '/landing';
          this.router.navigate([redirectUrl]);
        },
        error: () => {
          this.showSpinner.set(false);
          this.errorMessage.set("Something went wrong, please try again.");
        }
      });
    }
  }

  onRememberMeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rememberMe.set(input.checked);
  }
}
