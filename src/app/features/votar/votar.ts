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

  // Llamamos al nuevo método que creamos en el servicio
  this.artistaService.votarArtista(this.artista.id.toString()).subscribe({
    next: () => {
      // Si el backend responde 200 OK, incrementamos visualmente o 
      // podrías recargar el objeto si el backend te lo devolviera.
      this.artista.votosRanking++; 
      
      this.votoRealizado.emit(this.artista);
      this.cargando = false;
      alert('¡Voto registrado con éxito!');
    },
    error: (err) => {
      this.cargando = false;
      // Aquí capturamos el error del "catch" de Java (ej. "Usuario no encontrado")
      console.error('Error al votar:', err);
      alert(err.error || 'Error al procesar el voto');
    }
  });
}
}