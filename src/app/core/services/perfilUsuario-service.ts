import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../features/profile/profile';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

// perfil.service.ts
@Injectable({ providedIn: 'root' })
export class PerfilService {
  constructor(private http: HttpClient) {}

  obtenerMiPerfil(): Observable<Usuario> {
  // No necesita parámetros porque el Back usa el token de la sesión (Authentication)
  return this.http.get<Usuario>(`${environment.apiUrl}/profile/perfil`);
}

  getPerfilByUsuarioId(usuarioId: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiUrl}/perfiles/usuario/${usuarioId}`);
  }

  updatePerfil(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/perfiles/${id}`, data);
  }
}