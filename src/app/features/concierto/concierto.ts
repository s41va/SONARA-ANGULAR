import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { ConciertoService } from '../../core/services/concierto.service';
import { Concierto } from '../../core/models/concierto.models';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { TicketsComponent } from '../tickets/tickets'; 

@Component({
  selector: 'app-concierto',
  standalone: true,
  // 2. AÑADE TicketsComponent A LOS IMPORTS
  imports: [CommonModule, TicketsComponent], 
  templateUrl: './concierto.html',
  styleUrls: ['./concierto.scss']
})
export class ConciertoComponent implements OnInit, OnDestroy {
  conciertos: Concierto[] = [];
  isLoading: boolean = false;
  
  // 3. VARIABLE PARA CONTROLAR EL MODAL
  conciertoSeleccionado: Concierto | null = null;
  
  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<{n: string, f: string, u: string}>();
  
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private conciertoService = inject(ConciertoService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.filterSubject.pipe(
        debounceTime(350),
        distinctUntilChanged((p, c) => JSON.stringify(p) === JSON.stringify(c)),
        tap(() => {
          this.ngZone.run(() => {
            this.isLoading = true;
            this.cdr.markForCheck();
          });
        }),
        switchMap(f => 
          this.conciertoService.fetchConciertosPay(0, 9, 'fechaHora,asc', f.n, f.f, f.u)
        ),
        takeUntil(this.destroy$)
      ).subscribe({
        next: (res: any) => {
          this.ngZone.run(() => {
            this.conciertos = res.content || [];
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          this.ngZone.run(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          });
        }
      });

      this.onFilterChange('', '', '');
    }
  }


  abrirTicket(c: Concierto): void {
    console.log('Concierto seleccionado:', c); // Si esto sale en la consola, el botón funciona
    this.conciertoSeleccionado = c;
  }

  onFilterChange(nombre: string, fecha: string, ubi: string): void {
    this.filterSubject.next({ n: nombre, f: fecha, u: ubi });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}