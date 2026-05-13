import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from '../core/guards/auth-guard';

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
        path: 'users/new',
        loadComponent: () =>
            import('./pages/usuarios/usuarios-create/usuarios-create').then(c => c.UsuarioCreate)
    },
    {
        path: 'users/:id',
        loadComponent: () =>
            import('./pages/usuarios/usuarios-detail/usuarios-detail').then(c => c.UsuarioDetail)
    },
    {
        path: 'users/:id/edit',
        loadComponent: () =>
            import('./pages/usuarios/usuarios-edit/usuarios-edit').then(c => c.UsuarioEdit)
    },
    {
        path: 'artists',
        loadComponent: () =>
            import('./pages/artistas/artistas').then(c => c.Artistas)
    },
    {
        path: 'artists/new',
        loadComponent: () =>
            import('./pages/artistas/artistas-create/artistas-create').then(c => c.ArtistaCreate)
    },
    {
        path: 'artists/:id',
        loadComponent: () =>
            import('./pages/artistas/artistas-detail/artistas-detail').then(c => c.ArtistaDetail)
    },
    {
        path: 'concierto',
        loadComponent: () =>
            import('./pages/conciertos/conciertos').then(c => c.Conciertos)
    },
    {
        path: 'concierto/new',
        loadComponent: () =>
            import('./pages/conciertos/conciertos-create/conciertos-create').then(c => c.ConciertosCreate),
        canActivate: [authGuard]
    },
    {
        path: 'concierto/:id',
        loadComponent: () =>
            import('./pages/conciertos/conciertos-detail/conciertos-detail').then(c => c.ConciertoDetail),
        canActivate: [authGuard]
    },
    {
        path: 'concierto/:id/edit',
        loadComponent: () =>
            import('./pages/conciertos/conciertos-edit/conciertos-edit').then(c => c.ConciertoEdit),
        canActivate: [authGuard]
    },
    {
        path: 'peticiones',
        loadComponent: () =>
            import('./pages/peticiones/peticiones/peticiones').then(c => c.SolicitudesAdminComponent),
        canActivate: [authGuard]
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