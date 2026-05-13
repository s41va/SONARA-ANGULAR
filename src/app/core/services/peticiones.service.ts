import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface SolicitudArtistaCreateDTO {
  nombreArtista: string;
  generoSugerido?: string;
  descripcion?: string;
  fotoUrl?: string;
}

export interface SolicitudArtistaDTO {
  id: number;
  nombreArtista: string;
  generoSugerido?: string;
  descripcion?: string;
  fotoUrl?: string;
  usuarioId: number;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
  fechaSolicitud: string;
}

export interface SolicitudArtistaUpdateDTO {
  nombreArtista?: string;
  generoSugerido?: string;
  descripcion?: string;
  fotoUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudArtistaService {

  private apiUrl = `${environment.apiUrl}/solicitudes`;

  constructor(private http: HttpClient) {}

  // --- USUARIO ---

  crearSolicitud(dto: SolicitudArtistaCreateDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }

  // --- ADMIN ---

  listarPendientes(): Observable<SolicitudArtistaDTO[]> {
    return this.http.get<SolicitudArtistaDTO[]>(`${this.apiUrl}/admin/pendientes`);
  }

  aprobarSolicitud(id: number, dto: SolicitudArtistaUpdateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/aprobar/${id}`, dto);
  }

  rechazarSolicitud(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/rechazar/${id}`, {});
  }
}