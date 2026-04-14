import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';

export interface AuthResponse {
  token: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly isBrowser: boolean;
  private token$ = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedToken = localStorage.getItem(this.TOKEN_KEY);
      this.token$.next(savedToken);
    }
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/authenticate`, { username, password })
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  private saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.token$.next(token);
  }

  getToken(): string | null {
    return this.token$.value;
  }

  isLoggedIn(): Observable<boolean> {
    return this.token$.pipe(map((token) => token !== null));
  }

  // Decodifica el payload del JWT (no valida firma, solo lee claims)
  private decodeToken(): any | null {
    const token = this.token$.value;
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  // Devuelve los roles del usuario, ej: ['ROLE_ADMIN']
  getRoles(): string[] {
    return this.decodeToken()?.roles ?? [];
  }

  // Comprueba si tiene un rol concreto
  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // Observables reactivos para usar en el template con async pipe
  isAdmin(): Observable<boolean> {
    return this.token$.pipe(map(() => this.hasRole('ROLE_ADMIN')));
  }

  isManager(): Observable<boolean> {
    return this.token$.pipe(map(() => this.hasRole('ROLE_MANAGER')));
  }

  logout(redirectTo: string = '/login'): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
    this.token$.next(null);
    this.router.navigate([redirectTo]);
  }
}