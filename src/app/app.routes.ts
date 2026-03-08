import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./layout/public-layout/public-layout').then(
        (m) => m.PublicLayout,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/auth/login/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
      },
    ],
  },
  {
    path: 'otp',
    loadComponent: () =>
      import('./layout/public-layout/public-layout').then(
        (m) => m.PublicLayout,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/auth/otp/otp').then((m) => m.OtpComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/inner-layout/inner-layout').then((m) => m.InnerLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'vehicles/add/single',
        loadComponent: () =>
          import('./features/vehicles-management/add-vehicle-single/add-vehicle-single').then(
            (m) => m.AddVehicleSingle,
          ),
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./features/vehicles-management/vehicles-management').then((m) => m.VehiclesManagement),
      },
      {
        path: 'auctions',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
    ],
  },
];
