import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [CommonModule, TranslateModule],
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {

  private router = inject(Router)
  menuOptions = [
    { title: 'ADMIN.USERS', icon: '👤', route: 'users' },
    { title: 'ADMIN.TICKETS' , icon: '🏟️', route: 'concierto' },
    { title:'ADMIN.ARTIST' , icon: '🎵', route: 'artists' },
    { title: 'ADMIN.PETITION' , icon: '👤 + 🎵 ', route: 'peticiones' }
  ];

  navigate(route: string) {
   this.router.navigate(['/admin', route]);
  }
}