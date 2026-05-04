import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UsuarioService } from '../../../../core/services/usuario.service';
import { LocalidadService } from '../../../../core/services/localidad.service';
// import { UsuarioUpdateDTO } from '../../../../core/models/usuario.models';
import { Localidad } from '../../../../core/models/localidad.model';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios-edit.html',
  styleUrls: ['./usuarios-edit.scss'],
})
export class UsuarioEdit implements OnInit {
  
  model: any = {
    id: 0,
    nombre: '',
    email: '',
    bio: '',
    phoneNumber: '',
    localidadId: null,
    fechaNacimiento: '',
    locale: 'es'
  };

  localidades: Localidad[] = [];
  loading = false; 
  saving = false;
  error: string | null = null;
  fieldErrors: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private localidadService: LocalidadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.error = 'ID de usuario inválido';
      return;
    }

    this.loadLocalidades();
    this.loadUsuario(id);
  }

  private loadLocalidades(): void {
    this.localidadService.getLocalidades().subscribe({
      next: (data) => this.localidades = data.content || data,
      error: () => console.error('Error cargando localidades')
    });
  }

  private loadUsuario(id: number): void {
    this.loading = true;
    this.error = null;

    this.usuarioService.fetchUsuarioById(id).subscribe({
      next: (data) => {
        // Mapeamos los datos del backend al modelo del formulario
        this.model = {
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          bio: data.bio,
          phoneNumber: data.phoneNumber,
          localidadId: data.localidad_id,
          fechaNacimiento: data.fechaNacimiento,
          locale: data.locale || 'es'
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.handleError(err, 'Error al cargar el usuario');
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.saving = true;
    this.error = null;
    this.fieldErrors = {};

    // El backend espera UsuarioUpdateDTO
    this.usuarioService.updateUsuario(this.model.id, this.model).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/usuarios']); // O a la vista de perfil
      },
      error: (err) => {
        this.saving = false;
        this.handleError(err, 'Error al actualizar el usuario');
        this.cdr.detectChanges();
      },
    });
  }

  private handleError(err: unknown, defaultMsg: string): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 400) {
        this.error = err.error?.message || 'Validación fallida';
        this.fieldErrors = err.error?.fieldErrors || {};
      } else if (err.status === 404) {
        this.error = 'Usuario no encontrado';
      } else if (err.status === 403) {
        this.router.navigate(['/forbidden']);
      } else {
        this.error = err.error?.message || defaultMsg;
      }
    } else {
      this.error = defaultMsg;
    }
  }
}