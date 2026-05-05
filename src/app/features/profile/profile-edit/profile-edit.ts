import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../core/models/usuario.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LocalidadService } from '../../../core/services/localidad.service';
import { Localidad } from '../../../core/models/localidad.model';
// ... imports anteriores

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile-edit.html',
  styleUrls: ['./profile-edit.scss']
})
export class ProfileEdit implements OnInit {
  public usuario: Usuario | null = null;
  public profileForm!: FormGroup;
  localidades : Localidad[] = []; 
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localidadService: LocalidadService
  ) {
    this.createForm();
  }

 ngOnInit() {
  // 1. Cargamos las localidades primero o en paralelo
  this.loadLocalidades();

  // 2. Escuchamos al usuario
  this.authService.getUser().subscribe(user => {
    if (user) {
      this.usuario = user;
      
      // Mapeo manual si los nombres de la API no coinciden exactos con el formulario
      this.profileForm.patchValue({
        nombreCompleto: user.nombreCompleto,
        email: user.email,
        localidadId: user.localidadNombre || null, // Asegúrate de extraer el ID
        fechaNacimiento: user.fechaNacimiento,
        bio: user.bio,
        locale: user.locale,
        phoneNumber: user.phoneNumber
      });
    }
  });
}

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

  createForm() {
  this.profileForm = this.fb.group({
    nombreCompleto: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    localidad: [null],        // Campo nuevo
    fechaNacimiento: [''],   // Campo nuevo
    bio: [''],
    locale: ['Español'],
    phoneNumber: ['']
  });
}

// Nota: Asegúrate de que los nombres coincidan con tu modelo de "Usuario"
// Si tu API devuelve fechaNacimiento en formato ISO, patchValue lo manejará bien.

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Lógica para previsualizar o subir la imagen
      console.log("Imagen seleccionada:", file.name);
    }
  }

  guardarCambios() {
    if (this.profileForm.valid) {
      const data = this.profileForm.value;
      console.log("Datos a guardar:", data);
      // Simular guardado
      this.router.navigate(['/profile']);
    }
  }

  cancelar() {
    this.router.navigate(['/profile']);
  }
}