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
import { VotarArtistaComponent } from './features/votar/votar';
import { ListaArtistasComponent } from './features/votar/lista-artista-votar';
import { ConciertoComponent } from './features/concierto/concierto';
import { PagoExitoComponent } from './features/pago-exito/pago-exito';
import { Oauth2RedirectComponent } from './features/oauth2-redirect/oauth2-redirect'; 
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password';
import { ResetPasswordComponent } from './features/reset-password/reset-password';
import { adminGuard } from './admin/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',           
    component: Home, 
  },
  {
    path: 'admin',
    canActivate: [adminGuard], 
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
    path: 'pago-exito',
    component: PagoExitoComponent,
    data: {role: 'USER'}
  },
  {
    path: 'concierto',
    component: ConciertoComponent,
    data: {role: 'USER'}
  }, 
  {
    path: 'peticiones/artista',
    component: SolicitudCrearComponent,
    data: {role: 'USER'}
  },  
  {
    path: 'votar',
    children: [
      {path: 'artista', component: ListaArtistasComponent}
    ],
    data: {role: 'USER'}
  },
  {
    path: 'oauth2/redirect',
    component: Oauth2RedirectComponent
  },  
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'forbidden',
    component: Forbidden, 
  },
  {
    path: '**',
    component: Error404, 
  },
];