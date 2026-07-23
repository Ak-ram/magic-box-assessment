import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadComponent: () => import('../pages/landing/landing.component'),
  },
  {
    path: 'purchase',
    loadComponent: () => import('../pages/purchase/purchase.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('../pages/login/login.component'),
  },
];
