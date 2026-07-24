import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const loginGuard:CanActivateFn = () => {
//   injection list
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated()){
    router.navigate(['./landing']);
    return false;
  }
  return true;
};
