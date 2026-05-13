import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Forbidden } from './features/forbidden/forbidden';
import { Error404 } from './features/error404/error404';
import { Login } from './features/login/login';
import { Profile } from './features/profile/profile';
import { authGuard } from './core/guards/auth-guard';
import { RegisterComponent } from './features/signup/signup';
import { ProfileEdit } from './features/profile/profile-edit/profile-edit';
import { Mapa } from './features/maps/mapa/mapa';
import { TicketsComponent } from './features/tickets/tickets';
import { SolicitudesAdminComponent } from './admin/pages/peticiones/peticiones/peticiones';
import { SolicitudCrearComponent } from './features/peticiones-user/peticiones-user';

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
    path: 'signup',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'profile',
    component: Profile,
    data: {role: 'USER'}
  }, 
  {
    path: 'profile/edit',
    component: ProfileEdit,
    data: {role: 'USER'}
  }, 
  {
    path: 'mapa',
    component: Mapa,
    data: {role: 'USER'}
  },  
  {
    path: 'tickets',
    component: TicketsComponent,
    data: {role: 'USER'}
  }, 
  {
    path: 'peticiones/artista',
    component: SolicitudCrearComponent,
    data: {role: 'USER'}
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
