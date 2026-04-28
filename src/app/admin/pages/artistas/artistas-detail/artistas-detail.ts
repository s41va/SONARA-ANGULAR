import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArtistaService } from '../../../../core/services/artistas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artista-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './artistas-detail.html',
  styleUrl: './artistas-detail.scss'
})
export class ArtistaDetail implements OnInit {
  artista: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private artistaService: ArtistaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArtista(id);
    }
  }

  loadArtista(id: string): void {
    this.loading = true;
    this.artistaService.getArtistaById(id).subscribe({
      next: (response: any) => {
        // Manejo de respuesta: objeto directo o array content
        if (response && response.content) {
          this.artista = response.content[0];
        } else {
          this.artista = response;
        }
        console.log(this.artista);
        this.loading = false;
        this.cdr.detectChanges(); // Forzamos refresco de UI
      },
      error: (err) => {
        console.error('Error al cargar artista:', err);
        this.error = 'No se pudo cargar la información del artista.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}