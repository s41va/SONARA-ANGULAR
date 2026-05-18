import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; 

@Component({
  selector: 'app-oauth2-redirect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oauth2-redirect.html',
  styleUrls: ['./oauth2-redirect.scss']
})
export class Oauth2RedirectComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
  const token = this.route.snapshot.queryParamMap.get('token');
  
  if (token) {
    // 1. Guardamos el token
    this.authService.saveToken(token); 
    
    // 2. Le damos un respiro de 50ms a Angular para asegurar que el interceptor lea el token guardado
    setTimeout(() => {
      this.authService.fetchUserProfile().subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Error al recuperar el perfil tras OAuth2:', err);
          this.router.navigate(['/login']);
        }
      });
    }, 50);

  } else {
    this.router.navigate(['/login'], { queryParams: { error: 'oauth2_failed' } });
  }
}
}