import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../core/models/usuario.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.usuario = user;
        this.profileForm.patchValue(user);
      }
    });
  }

  createForm() {
  this.profileForm = this.fb.group({
    nombreCompleto: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    localidad: [''],        // Campo nuevo
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