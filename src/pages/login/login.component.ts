import { Component, signal } from '@angular/core';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  standalone: true,
})
export default class LoginComponent {
  // State
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  showPassword = signal(false);

  // Methods

  // Add description here also
  togglePassword() {
    this.showPassword.update((v) => !v);
  }
  // here description needed
  submit() {}
}
