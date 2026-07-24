import { Component, inject, signal } from '@angular/core';
import { ILoginForm } from '../../models/auth.model';
import { form, FormField, required, minLength } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  // State
  rememberMe = signal<boolean>(false);
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

  // Methods
  submit() {
    if (this.loginForm().valid()) {
      this.authService.login(this.loginModal()).subscribe({
        next: () => {
          const redirectUrl = this.route.snapshot.queryParamMap.get('redirect') || '/landing';
          console.log('Redirect URL:', redirectUrl);
          this.router.navigate([redirectUrl]);
        },
      });
      console.log('Form Data:', this.loginModal());
      console.log('Remember Me:', this.rememberMe());
    }
  }

  onRememberMeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rememberMe.set(input.checked);
  }
}
