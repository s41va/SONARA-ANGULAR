import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RankingService {

  private apiUrl = `${environment.apiUrl}/ranking`;

  constructor (private http: HttpClient){}


  getTopArtistasPorProvincia(nombre: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/localidad/${nombre}`);
  }

  // En tu LocalidadService
  getTopArtistasGlobal(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/ranking/global`);
  }
}
