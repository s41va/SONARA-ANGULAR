import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Concierto } from '../models/concierto.models';
import { Page } from '../models/pagination.model';

@Injectable({ providedIn: 'root' })
export class ConciertoService {
  private readonly baseUrl = `${environment.apiUrl}/concierto`;

  constructor(private http: HttpClient) { }

  fetchConciertos(page: number, size: number, sort: string): Observable<Page<Concierto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<Page<Concierto>>(this.baseUrl, { params });
  }

  fetchConciertosPay(page: number, size: number, sort: string, nombre: string, fecha: string, ubi: string): Observable<Page<Concierto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (nombre) params = params.set('nombre', nombre);
    if (fecha) params = params.set('fecha', fecha);
    if (ubi) params = params.set('ubi', ubi);

    return this.http.get<Page<Concierto>>(this.baseUrl, { params });
  }

  fetchConciertosById(id: number): Observable<Concierto> {
    return this.http.get<Concierto>(`${this.baseUrl}/${id}`);
  }

  updateConcierto(id: number, conciertoData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, conciertoData);
  }

  createConcierto(conciertoData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, conciertoData);
  }

  deleteConcierto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}