import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [CommonModule],
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {

  private router = inject(Router)
  menuOptions = [
    { title: 'Administrar Usuarios', icon: '👤', route: 'users' },
    { title: 'Administrar Conciertos/Eventos', icon: '🏟️', route: 'concierto' },
    { title: 'Administrar Artistas', icon: '🎵', route: 'artists' },
    { title: 'Administrar Mapa', icon: '🗺️', route: '/map' },
    { title: 'Administrar Estadísticas', icon: '📊', route: '/stats' },
    { title: 'Administrar El Pago', icon: '💳', route: '/payments' },
  ];

  navigate(route: string) {
   this.router.navigate(['/admin', route]);
  }
}