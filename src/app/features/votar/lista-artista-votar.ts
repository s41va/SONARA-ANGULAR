import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistaService } from '../../core/services/artistas.service';
import { Artista } from '../../core/models/artistas.model';
import { VotarArtistaComponent } from './votar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lista-artistas',
  standalone: true,
  imports: [CommonModule, VotarArtistaComponent],
  template: `
    <div class="container">
      <h2 id="Title">Ranking de Artistas</h2>
         <p>Número de artistas: {{ artistas.length }}</p>
      <!-- Spinner o mensaje de carga -->
      <div *ngIf="cargando">Cargando artistas...</div>

      <!-- Lista de artistas -->
      <div class="grid" *ngIf="!cargando">
        @for (artista of artistas; track artista.id) {
          <app-votar-artista 
            [artista]="artista" 
            (votoRealizado)="onVotoRegistrado($event)">
          </app-votar-artista>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      background-color: #00B8D4;
      border-radius: 20px;
      margin-bottom: 2rem;
    }

    h2 {
      color: black;
      border-bottom: 2px solid black;
      padding-bottom: 10px;
      text-align: center;
    }

    p {
      text-align: center;
      font-weight: bold;
    }

    .info-text {
      color: #666;
      font-size: 0.9rem;
    }

    .loading {
      text-align: center;
      padding: 40px;
      font-weight: bold;
      color: #007bff;
    }


    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr); 
      gap: 20px;
      margin-top: 20px;
    }

    @media (max-width: 600px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ListaArtistasComponent implements OnInit {
  artistas: Artista[] = [];
  cargando = true;

  constructor(private artistaService: ArtistaService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarArtistas();
  }

  cargarArtistas(): void {
    this.artistaService.getArtistas().subscribe({
      // Cambiamos 'data: any[]' por 'artistasRecibidos' para evitar conflictos
      next: (artistasRecibidos: Artista[]) => {
        console.log('Datos recibidos:', artistasRecibidos);

        this.artistas = artistasRecibidos;
        console.log("Ha llegado al next");
        this.cargando = false;

        // Ordenamos por votos para el ranking
        this.artistas.sort((a, b) => b.votosRanking - a.votosRanking);
        this.cdr.detectChanges();


      },
      error: (err) => {
        console.error('Error al cargar:', err);
        this.cargando = false;
      }
    });

  }

  onVotoRegistrado(artistaActualizado: Artista): void {
    console.log('Nuevo voto para:', artistaActualizado.nombre);
    // Opcional: Re-ordenar la lista localmente por votos si quieres ver el ranking en tiempo real
    this.artistas.sort((a, b) => b.votosRanking - a.votosRanking);
  }
}