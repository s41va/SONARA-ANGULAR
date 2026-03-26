import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Forbidden } from './features/forbidden/forbidden';
import { Error404 } from './features/error404/error404';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',           // evita que '' capture todo
    component: Home, // Ruta inicial
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
