import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Servicios
import { UsuarioService } from '../../../../core/services/usuario.service';
import { LocalidadService } from '../../../../core/services/localidad.service';

// Modelos
import { Localidad } from '../../../../core/models/localidad.model';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './usuarios-create.html',
  styleUrl: './usuarios-create.scss'
})
export class UsuarioCreate implements OnInit {
  usuarioForm: FormGroup;
  loading = false;
  error: string | null = null;
  
  // Datos para los desplegables
  localidades: Localidad[] = [];
  rolesDisponibles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Usuario' },
    { id: 3, nombre: 'Gestor' }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private localidadService: LocalidadService,
    private router: Router
  ) {
    // Definición del formulario con los nombres exactos que espera tu UsuarioCreateDTO
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contrasenaHash: ['', [Validators.required, Validators.minLength(6)]],
      fechaNacimiento: ['', [Validators.required]],
      localidadId: [null, [Validators.required]],
      rolesIds: [2, [Validators.required]], // Por defecto el ID 2 (Usuario)
      phoneNumber: [''],
      bio: [''],
      locale: ['es'],
      profileImage: ['']
    });
  }

  ngOnInit(): void {
    this.loadLocalidades();
  }

  /**
   * Carga la lista de localidades desde el backend
   */
  loadLocalidades(): void {
    this.localidadService.getLocalidades().subscribe({
      next: (response: any) => {
        // Manejamos si la respuesta viene paginada (.content) o es un array directo
        this.localidades = response.content || response;
      },
      error: (err) => {
        console.error('Error al obtener localidades:', err);
        this.error = 'No se pudieron cargar las localidades. Verifica la conexión.';
      }
    });
  }

  /**
   * Envía el formulario al backend
   */
  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.markFormGroupTouched(this.usuarioForm);
      return;
    }

    this.loading = true;
    this.error = null;

    // Preparamos el payload
    const formValues = this.usuarioForm.value;
    
    // El backend espera rolesIds como una colección (Array), no un número suelto
    const payload = {
      ...formValues,
      rolesIds: [Number(formValues.rolesIds)], // Convertimos el valor del select en un Array
      fechaRegistro: new Date().toISOString()  // Opcional, dependiendo de si el DTO lo requiere
    };

    this.usuarioService.createUsuario(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        this.loading = false;
        // Intentamos extraer el mensaje de error del backend si existe
        this.error = err.error?.message || 'Error al crear el usuario. Revisa los campos obligatorios.';
        console.error('Error 400/500 en el servidor:', err);
      }
    });
  }

  /**
   * Utilidad para marcar todos los campos como tocados (para mostrar errores de validación)
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}