import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { Usuario } from '../models/usuario.model'; // Asegúrate de tener este modelo

export interface AuthResponse {
  token: string;
  usuario?: Usuario; // Opcional: por si tu API devuelve el usuario al loguear
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user'; // Clave para persistir el objeto usuario
  private readonly isBrowser: boolean;

  // Fuentes de datos reactivas (Subjects)
  private token$ = new BehaviorSubject<string | null>(null);
  private user$ = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Al arrancar, recuperamos lo que haya en localStorage (solo si estamos en el navegador)
    if (this.isBrowser) {
      const savedToken = localStorage.getItem(this.TOKEN_KEY);
      const savedUser = localStorage.getItem(this.USER_KEY);

      if (savedToken) {
        this.token$.next(savedToken);
      }
      if (savedUser) {
        try {
          this.user$.next(JSON.parse(savedUser));
        } catch (e) {
          console.error("Error parseando el usuario del localStorage", e);
        }
      }
    }
  }

  // --- MÉTODOS DE ACCIÓN ---

  /**
   * Realiza el login y guarda tanto el token como el usuario (si viene en la respuesta)
   */
  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/authenticate`, { username, password })
      .pipe(
        tap((res) => {
          this.saveToken(res.token);
          if (res.usuario) {
            this.saveUser(res.usuario);
          }
        })
      );
  }


  fetchUserProfile(): Observable<Usuario | null> {
    return this.http.get<Usuario>(`${environment.apiUrl}/profile/perfil`).pipe(
      tap(user => this.saveUser(user)),
      catchError(err => {
        console.error("Error obteniendo perfil:", err);
        return of(null);
      })
    );
  }

  logout(redirectTo: string = '/login'): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.token$.next(null);
    this.user$.next(null);
    this.router.navigate([redirectTo]);
  }


  private saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.token$.next(token);
  }

  private saveUser(user: Usuario): void {
    if (this.isBrowser) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.user$.next(user);
  }

  // --- GETTERS REACTIVOS (Para componentes) ---

  /** Devuelve el token actual */
  getToken(): string | null {
    return this.token$.value;
  }

  /** Observable del usuario actual para usar en el perfil */
  getUser(): Observable<Usuario | null> {
    return this.user$.asObservable();
  }

  /** Comprueba si hay una sesión activa */
  isLoggedIn(): Observable<boolean> {
    return this.token$.pipe(map((token) => token !== null));
  }

  // --- ROLES Y JWT ---

  private decodeToken(): any | null {
    const token = this.token$.value;
    if (!token) return null;
    try {
      // Usamos b64DecodeUnicode para manejar caracteres especiales
      const payload = token.split('.')[1];
      const jsonPayload = decodeURIComponent(atob(payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  getRoles(): string[] {
    return this.decodeToken()?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isAdmin(): Observable<boolean> {
    return this.token$.pipe(map(() => this.hasRole('ROLE_ADMIN')));
  }

  isManager(): Observable<boolean> {
    return this.token$.pipe(map(() => this.hasRole('ROLE_MANAGER')));
  }
}