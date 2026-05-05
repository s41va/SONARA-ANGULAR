import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Usuario } from '../../core/models/usuario.model';
import { AuthService } from '../../core/services/auth.service';
import {Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  public usuario: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object // Para saber si es navegador
    
  ) { }

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.authService.getUser().subscribe(user => {
      console.log('Datos actuales en el servicio:', user);
      
      if (user) {
        this.usuario = user;
      } else {
        // Si el usuario es null pero tenemos token, pedimos los datos a la API
        console.log('Usuario null, intentando recuperar perfil del servidor...');
        this.authService.fetchUserProfile().subscribe({
          next: (userFetched) => {
            if (userFetched) {
              this.usuario = userFetched;
            }
          },
          error: (err) => console.error('No se pudo recuperar el perfil', err)
        });
      }
    });
  }
}

editarUsuario(){
  this.router.navigate(['/profile/edit'])
}
}