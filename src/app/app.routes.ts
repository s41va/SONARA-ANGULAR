import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Forbidden } from './features/forbidden/forbidden';
import { Error404 } from './features/error404/error404';
import { Login } from './features/login/login';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',           // evita que '' capture todo
    component: Home, // Ruta inicial
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(r => r.ADMIN_ROUTES)
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'forbidden',
    component: Forbidden, // Página 403
  },
  {
    path: '**',
    component: Error404, // Ruta comodín 404
  },
];
