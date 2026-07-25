# Magic Box Assessment

A small Angular app with clear structure, component-based routing, and simple route guards. This README explains how to run the project and where to find the main parts of the code.

---

## Quick start

Prerequisites
- Node.js 18 or newer
- npm or yarn

Install and run
```bash
git clone https://github.com/Ak-ram/magic-box-assessment.git
cd magic-box-assessment
npm install
ng serve
```
Open http://localhost:4200 in your browser.

---

## What you will find

- Pages: landing, purchase, login
- Reusable UI components in `src/components`
- Services and API logic in `src/services`
- Types and interfaces in `src/models`
- Route guards in `src/guards`

---

## Project structure (short)

src/
- app/        — app root, routes, and main component
- pages/      — full-page components (landing, purchase, login)
- components/ — shared UI parts
- services/   — HTTP and business logic
- guards/     — route protection
- models/     — TypeScript types
- assets/     — static files

---

## Routing

Main routes:
- `/` redirects to `/landing`
- `/landing` — public page
- `/purchase` — purchase page (lazy loaded)
- `/login` — protected by a login guard

Example (simplified)
```ts
export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', loadComponent: () => import('./pages/landing/landing.component') },
  { path: 'purchase', loadComponent: () => import('./pages/purchase/purchase.component') },
  { path: 'login', loadComponent: () => import('./pages/login/login.component'), canActivate: [loginGuard] },
];
```

---

## Common commands

Start dev server
```bash
ng serve
```

Build production
```bash
ng build --configuration production
```

Generate code
```bash
ng generate component name
ng generate service name
ng generate guard name
```

Testing
```bash
ng test       # unit tests (Vitest)
ng e2e        # end-to-end tests
```

---

## Notes for developers

- Use lazy loading for large pages to improve startup time.
- Keep services small and focused.
- Add unit tests next to components and services using `.spec.ts` files.

---

## Contributing

1. Create a feature branch from the default branch.
2. Make small, focused commits.
3. Push and open a pull request.

---

## License

MIT — see LICENSE file.

---

Author: Ak-ram — https://github.com/Ak-ram
