import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { LocalidadService } from '../../core/services/localidad.service';
import { Localidad } from '../../core/models/localidad.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  localidades: Localidad[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private localidadService: LocalidadService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contrasenaHash: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      localidadId: [null, [Validators.required]]
    }, { validators: this.passwordMatchValidator }); // Validador personalizado
  }

  ngOnInit(): void {
    this.loadLocalidades();
  }

  // Validador para comparar contraseñas
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('contrasenaHash');
    const repeatPassword = control.get('repeatPassword');
    return password && repeatPassword && password.value !== repeatPassword.value 
      ? { passwordMismatch: true } 
      : null;
  }

  loadLocalidades(): void {
    this.localidadService.getLocalidades().subscribe({
      next: (res: any) => this.localidades = res.content || res,
      error: () => this.error = 'Error al cargar localidades.'
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    const { repeatPassword, ...userData } = this.registerForm.value;

    const payload = {
      ...userData,
      rolesIds: [2], // Asignamos automáticamente el rol de Usuario
      locale: 'es'
    };

    this.usuarioService.createUsuario(payload).subscribe({
      next: () => {
        alert('¡Registro completado con éxito!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'No se pudo completar el registro. El email ya podría estar en uso.';
      }
    });
  }
}