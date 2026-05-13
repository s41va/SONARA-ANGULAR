import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { ConciertoService } from '../../core/services/concierto.service';
import { Concierto } from '../../core/models/concierto.models';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-concierto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concierto.html',
  styleUrls: ['./concierto.scss']
})
export class ConciertoComponent implements OnInit, OnDestroy {
  // Variables de estado
  conciertos: Concierto[] = [];
  isLoading: boolean = false;
  
  // Gestión de flujos asíncronos
  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<{n: string, f: string, u: string}>();
  
  // Inyecciones
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private conciertoService = inject(ConciertoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      // CONFIGURACIÓN DEL MOTOR DE BÚSQUEDA
      this.filterSubject.pipe(
        debounceTime(350), // Evita peticiones por cada letra (espera a que el usuario pare)
        distinctUntilChanged((p, c) => JSON.stringify(p) === JSON.stringify(c)), // No busca si el texto es el mismo
        tap(() => {
          // Encendemos el spinner antes de la petición
          this.ngZone.run(() => {
            this.isLoading = true;
            this.cdr.markForCheck();
          });
        }),
        switchMap(f => 
          // switchMap cancela la petición anterior si entra una nueva
          this.conciertoService.fetchConciertosPay(0, 9, 'fechaHora,asc', f.n, f.f, f.u)
        ),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (res: any) => {
          this.ngZone.run(() => {
            this.conciertos = res.content || [];
            this.isLoading = false;
            console.log("Datos actualizados correctamente");
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error("Error en el flujo de búsqueda:", err);
          this.ngZone.run(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        }
      });

      // CARGA INICIAL: Disparamos una búsqueda vacía para traer todos los conciertos
      this.onFilterChange('', '', '');
    }
  }

  onFilterChange(nombre: string, fecha: string, ubi: string): void {
    // Enviamos los valores al Subject. El pipe de arriba se encarga del resto.
    this.filterSubject.next({ n: nombre, f: fecha, u: ubi });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}