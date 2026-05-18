import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  emailSent: boolean = false;
  successMessage: string = '';

  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  onSendEmail() {
    if (!this.email) return;

    // 1. Inmediatamente cambiamos el estado visual para no hacer esperar al usuario
    this.emailSent = true;
    this.successMessage = 'Si el correo electrónico está registrado en nuestro sistema, recibirás un enlace de recuperación en unos minutos. Revisa tu bandeja de entrada y la carpeta de spam.';
    
    // Fuerza a Angular a pintar el mensaje de éxito ya mismo
    this.cdr.detectChanges(); 

    // 2. Lanzamos la petición al backend "en segundo plano" desde la perspectiva del usuario
    this.authService.sendForgotPasswordEmail(this.email).subscribe({
      next: (res) => {
        // Si el backend responde con un texto i18n específico, lo actualizamos en pantalla en silencio
        if (res && res.message) {
          this.successMessage = res.message;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        // En este flujo, aunque falle la red, mantenemos el mensaje genérico por seguridad 
        // o pintamos un log en consola para desarrollo
        console.error('Detalles del envío en background:', err);
      }
    });
  }
} 