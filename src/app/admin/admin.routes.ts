import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: DashboardComponent, // <--- CAMBIO AQUÍ: El Layout es el padre
        canActivate: [adminGuard],
    },
    {
        path: 'gestion', // Esta será la página principal de admin
        loadComponent: () =>
            import('./pages/dashboard/dashboard').then(c => c.DashboardComponent)
    },
    {
        path: 'users',
        loadComponent: () =>
            import('./pages/usuarios/usuarios').then(c => c.Usuarios)
    },
    {
        path: 'artists',
        loadComponent: () =>
            import('./pages/artistas/artistas').then(c => c.Artistas)
    },
    {
        path: 'tickets',
        loadComponent: () =>
            import('./pages/conciertos/conciertos').then(c => c.Conciertos)
    },
    {
        path: 'roles',
        loadComponent: () =>
            import('./pages/roles/roles').then(c => c.Roles)
    },
    {
        path: '', // Si entran solo a /admin, los mandamos a gestión
        redirectTo: 'gestion',
        pathMatch: 'full'
    }


];