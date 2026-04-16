import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Concierto } from '../models/concierto.models';
import { Page } from '../models/pagination.model';

@Injectable({ providedIn: 'root' })
export class ConciertoService {
  private readonly baseUrl = `${environment.apiUrl}/concierto`;

  constructor(private http: HttpClient) {}

  fetchConciertos(page: number, size: number, sort: string): Observable<Page<Concierto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get<Page<Concierto>>(this.baseUrl, { params });
  }

  deleteConcierto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}