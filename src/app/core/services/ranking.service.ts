import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class RankingService {

  private apiUrl = `${environment.apiUrl}`;

  constructor (private http: HttpClient){}


  getTopArtistasPorProvincia(provincia: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ranking/localidad/${provincia}`);
  }
/* 
  getTopArtistasPorProvinciaId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/localidad/${id}`);
  } */



  // En tu LocalidadService
  getTopArtistasGlobal(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/ranking/global`);
  }
}
