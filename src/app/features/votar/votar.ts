import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artista } from '../../core/models/artistas.model';
import { ArtistaService } from '../../core/services/artistas.service';
import { CommonModule } from '@angular/common';
import { ListaArtistasComponent } from './lista-artista-votar';

@Component({
  selector: 'app-votar-artista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './votar.html',
  styleUrls: ['./votar.scss']
})
export class VotarArtistaComponent {
  @Input() artista!: Artista;
  @Output() votoRealizado = new EventEmitter<Artista>();

  cargando = false;

  constructor(private artistaService: ArtistaService) {}

  votar(): void {
    if (this.cargando) return;

    this.cargando = true;
    const updatePayload = { votosRanking: this.artista.votosRanking + 1 };

    this.artistaService.updateArtista(this.artista.id, updatePayload).subscribe({
      next: (artistaActualizado) => {
        this.artista = artistaActualizado;
        this.votoRealizado.emit(this.artista);
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }
}