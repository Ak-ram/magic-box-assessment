import { Routes } from '@angular/router';
import { loginGuard } from '../guards/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    title: 'Landing Page',
    loadComponent: () => import('../pages/landing/landing.component'),
  },
  {
    path: 'purchase',
    title: 'Purchase Page',
    loadComponent: () => import('../pages/purchase/purchase.component'),
  },
  {
    path: 'login',
    title: 'Login Page',
    loadComponent: () => import('../pages/login/login.component'),
    canActivate: [loginGuard],
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
