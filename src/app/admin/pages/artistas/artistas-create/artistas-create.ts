import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ArtistaService } from '../../../../core/services/artistas.service';
import { Artista } from '../../../../core/models/artistas.model';

@Component({
  selector: 'app-artista-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './artistas-create.html',
  styleUrls: ['./artistas-create.scss'],
})
export class ArtistaCreate {
  nombreBusqueda: string = '';
  artistaEncontrado: any = null;
  loading = false;
  saving = false;
  error: string | null = null;

  // Usamos la API pública para buscar
  private readonly AUDIO_DB_SEARCH = 'https://www.theaudiodb.com/api/v1/json/2/search.php?s=';

  constructor(
    private artistaService: ArtistaService,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

 buscarEnApiExterna(): void {
  if (!this.nombreBusqueda.trim()) return;

  this.loading = true;
  this.error = null;
  this.artistaEncontrado = null;

  this.artistaService.getArtistaByNombreApi(this.nombreBusqueda).subscribe({
    next: (res: Artista) => {
      if (res && res.nombre) { // Verificación extra
        this.artistaEncontrado = res;
      } else {
        this.error = 'El artista no existe en la base de datos internacional.';
      }
      this.loading = false;
      this.cdr.detectChanges(); // <--- CRUCIAL
    },
    error: (err) => {
      this.error = 'Error al conectar con tu servidor.';
      this.loading = false;
      this.cdr.detectChanges(); // <--- CRUCIAL
    }
  });
}

  confirmarYGuardar(): void {
    this.saving = true;

    // Mapeamos al DTO que espera tu Backend
    const dto: Partial<Artista> = {
      // Usamos los nombres de las propiedades que vimos en el JSON de respuesta
      id: this.artistaEncontrado.id.toString(),
      nombre: this.artistaEncontrado.nombre,
      biografia: this.artistaEncontrado.biografia,
      foto: this.artistaEncontrado.foto,
      web: this.artistaEncontrado.web,
      genero: this.artistaEncontrado.genero, // No olvides el género si lo quieres guardar
      votosRanking: 0
    };

    this.artistaService.createArtista(dto).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/artists']);
      },
      error: (err) => {
        this.saving = false;
        this.error = 'No se pudo guardar el artista en la base de datos local.';
        this.cdr.detectChanges();
      }
    });
  }
}