import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  private apiUrl = `${environment.apiUrl}/localidad`;

  constructor(private http: HttpClient) { }

  // Método para obtener todas las localidades para el selector
  getLocalidades(): Observable<any> {
    // Añadimos el parámetro size para traer todas las localidades disponibles
    return this.http.get<any>(`${environment.apiUrl}/localidad?size=500`);
  }

  getLocalidadPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/localidad/${id}`);
  }

  getTopArtistasPorProvincia(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/artistas/ranking`);
  }

  // En tu LocalidadService
  getTopArtistasGlobal(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/ranking/global`);
  }
}



