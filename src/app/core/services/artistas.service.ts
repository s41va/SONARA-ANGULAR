import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Page } from '../models/pagination.model';
import { Artista } from '../models/artistas.model'; 

@Injectable({
  providedIn: 'root',
})
export class ArtistaService {
  private readonly baseUrl = `${environment.apiUrl}/artistas`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener lista de artistas paginada y ordenada
   */
  fetchArtistas(page: number, size: number, sort: string): Observable<Page<Artista>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    
    return this.http.get<Page<Artista>>(this.baseUrl, { params });
  }

  /**
   * Obtener un solo artista por su ID (idArtist de la API)
   */
  fetchArtistaById(id: number): Observable<Artista> {
    return this.http.get<Artista>(`${this.baseUrl}/${id}`);
  }

  /**
   * Crear un nuevo artista
   */
  createArtista(artista: Partial<Artista>): Observable<Artista> {
    return this.http.post<Artista>(this.baseUrl, artista);
  }

  /**
   * Actualizar un artista existente
   */
  updateArtista(id: number, artista: Partial<Artista>): Observable<Artista> {
    return this.http.put<Artista>(`${this.baseUrl}/${id}`, artista);
  }

  /**
   * Eliminar un artista de la base de datos local
   */
  deleteArtista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}