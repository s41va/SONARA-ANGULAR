import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConciertoService } from '../../../../core/services/concierto.service';
import { Concierto } from '../../../../core/models/concierto.models';

@Component({
  selector: 'app-concierto-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './conciertos-detail.html',
  styleUrl: './conciertos-detail.scss' 
})
export class ConciertoDetail implements OnInit {
  concierto: Concierto | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private conciertoService: ConciertoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadConcierto(+id);
    }
  }

  loadConcierto(id: number): void {
    this.loading = true;
    this.conciertoService.fetchConciertosById(id).subscribe({
      next: (data) => {
        console.log('Respuesta del servidor:', data);
        this.concierto = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('error Capturado:', err);
        this.error = 'No se pudo cargar la información del concierto.';
        this.loading = false;
      }
    });
  }
}