import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudArtistaService, SolicitudArtistaCreateDTO } from '../../core/services/peticiones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitud-crear',
  standalone: true,
    imports: [ReactiveFormsModule],
  templateUrl: './peticiones-user.html',
  styleUrls: ['./peticiones-user.scss']
})
export class SolicitudCrearComponent implements OnInit {
  solicitudForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudArtistaService,
    private router: Router
  ) {
    // Inicialización del formulario con validaciones
    this.solicitudForm = this.fb.group({
      nombreArtista: ['', [Validators.required, Validators.minLength(3)]],
      generoSugerido: [''],
      descripcion: ['', [Validators.maxLength(500)]],
      fotoUrl: ['', [Validators.pattern('https?://.+')]] // Validación básica de URL
    });
  }

  ngOnInit(): void {}

  enviarSolicitud(): void {
    if (this.solicitudForm.valid) {
      this.isSubmitting = true;
      const dto: SolicitudArtistaCreateDTO = this.solicitudForm.value;

      this.solicitudService.crearSolicitud(dto).subscribe({
        next: () => {
          alert('¡Solicitud enviada con éxito!');
          this.router.navigate(['/']); // Redirigir a inicio o donde prefieras
        },
        error: (err) => {
          console.error('Error al enviar solicitud', err);
          alert('Hubo un error al procesar tu solicitud.');
          this.isSubmitting = false;
        }
      });
    }
  }
}