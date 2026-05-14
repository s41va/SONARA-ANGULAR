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
      <h2>Ranking de Artistas</h2>
         <p>Estado cargando: {{ cargando }}</p>
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
  `
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