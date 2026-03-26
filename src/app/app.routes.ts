import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Forbidden } from './features/forbidden/forbidden';
import { Error404 } from './features/error404/error404';
import { Login } from './features/login/login';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',           // evita que '' capture todo
    component: Home, // Ruta inicial
  },
  {
    path: 'login',
    component: Login,
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
