import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConciertoService } from '../../../../core/services/concierto.service';
import { ArtistaService } from '../../../../core/services/artistas.service';
import { LocalidadService } from '../../../../core/services/localidad.service';

@Component({
  selector: 'app-conciertos-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './conciertos-create.html',
  styleUrl: './conciertos-create.scss'
})
export class ConciertosCreate implements OnInit {
  conciertoForm: FormGroup;
  artistas: any[] = [];
  localidades: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private conciertoService: ConciertoService,
    private artistaService: ArtistaService,
    private localidadService: LocalidadService,
    private router: Router
  ) {
    this.conciertoForm = this.fb.group({
      artistaId: ['', Validators.required],
      localidadId: ['', Validators.required],
      fechaHora: ['', Validators.required],
      local: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargamos los datos para los selectores
    this.artistaService.getArtistas().subscribe(data => this.artistas = data.content || data);
    this.localidadService.getLocalidades().subscribe(data => this.localidades = data.content || data);
  }

  onSubmit(): void {
    if (this.conciertoForm.valid) {
      this.loading = true;
      this.conciertoService.createConcierto(this.conciertoForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin/concierto']);
        },
        error: (err) => {
          console.error('Error al crear:', err);
          this.loading = false;
        }
      });
    }
  }
}