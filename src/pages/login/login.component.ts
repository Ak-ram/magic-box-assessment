import { Component, signal } from '@angular/core';
import { ILoginForm } from '../../models/auth.model';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormField],
})
export default class LoginComponent {
  // State
  rememberMe = signal<boolean>(false);
  loginModal = signal<ILoginForm>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModal, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is not valid' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 6, { message: 'Password must be at least 6 characters' });
  });

  // Methods
  submit() {
    if (this.loginForm().valid()) {
      console.log('Form Data:', this.loginModal());
      console.log('Remember Me:', this.rememberMe());
    }
  }

  onRememberMeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rememberMe.set(input.checked);
  }
}
