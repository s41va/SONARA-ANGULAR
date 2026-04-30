import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ConciertoService } from '../../../../core/services/concierto.service';
import { Concierto } from '../../../../core/models/concierto.models';
import { ApiError } from '../../../../core/models/concierto.model';

@Component({
  selector: 'app-concierto-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './conciertos-edit.html',
  styleUrls: ['./conciertos-edit.scss'],
})
export class ConciertoEdit implements OnInit {
  
  // Modelo para el formulario. 
  // Nota: Al editar, el backend suele esperar IDs para artista y localidad
  model: any = {
    id: 0,
    artistaId: null,
    localidadId: null,
    fechaHora: '',
    local: '',
    descripcion: ''
  };

  loading = false; 
  saving = false;
  error: string | null = null;
  fieldErrors: Record<string, string> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conciertoService: ConciertoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id)) {
      this.error = 'ID de concierto inválido';
      return;
    }

    this.loadConcierto(id);
  }

  private loadConcierto(id: number): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.conciertoService.fetchConciertosById(id).subscribe({
      next: (data: Concierto) => {
        // Mapeamos el objeto complejo al modelo plano del formulario
        this.model = {
          id: data.id,
          artistaId: data.artista.id,
          localidadId: data.localidad.id,
          fechaHora: data.fechaHora, 
          local: data.local,
          descripcion: data.descripcion
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        this.loading = false;
        this.handleError(err, 'Error al cargar el concierto');
        this.cdr.detectChanges();
      },
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.saving = true;
    this.error = null;
    this.fieldErrors = {};
    this.cdr.detectChanges();

    this.conciertoService.updateConcierto(this.model.id, this.model).subscribe({
      next: () => {
        this.saving = false;
        // Redirigir a la lista de administración
        this.router.navigate(['/admin/concierto']);
      },
      error: (err: unknown) => {
        this.saving = false;
        this.handleError(err, 'Error al actualizar el concierto');
        this.cdr.detectChanges();
      },
    });
  }

  private handleError(err: unknown, defaultMsg: string): void {
    if (err instanceof HttpErrorResponse) {
      const apiError = err.error as ApiError;
      if (err.status === 400) {
        this.error = apiError?.message || 'Validación fallida';
        this.fieldErrors = apiError?.fieldErrors || {};
      } else if (err.status === 404) {
        this.error = 'Concierto no encontrado';
      } else if (err.status === 403) {
        this.router.navigate(['/forbidden']);
      } else {
        this.error = apiError?.message || defaultMsg;
      }
    } else {
      this.error = defaultMsg;
    }
  }
}