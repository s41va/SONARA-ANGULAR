import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrls: ['../forgot-password/forgot-password.scss']
})
export class ResetPasswordComponent implements OnInit {
  dto = {
    token: '',
    newPassword: '',
    confirmPassword: ''
  };
  loading: boolean = false;
  passwordChanged: boolean = false;
  errorMessage: string = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    // Capturamos el token de la URL automáticamente (?token=xxx)
    const tokenFromUrl = this.route.snapshot.queryParamMap.get('token');
    if (tokenFromUrl) {
      this.dto.token = tokenFromUrl;
    } else {
      this.errorMessage = 'Token de recuperación ausente o no válido.';
    }
  }

  onResetPassword() {
    if (!this.dto.token) return;
    
    if (this.dto.newPassword !== this.dto.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.resetPassword(this.dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.passwordChanged = true;
        this.cdr.detectChanges(); // Fuerza a Angular a mostrar la caja de éxito e "Ir al Login"

        // Opcional: Redirigir al login automáticamente tras 3 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3500);
      },
      error: (err) => {
        this.loading = false;
        // Muestra el mensaje i18n de token caducado o inválido de tu Spring Boot
        this.errorMessage = err.error?.error || err.error?.message || 'No se pudo restablecer la contraseña.';
        this.cdr.detectChanges(); // Fuerza a Angular a restaurar el botón para volver a intentar
      }
    });
  }
}