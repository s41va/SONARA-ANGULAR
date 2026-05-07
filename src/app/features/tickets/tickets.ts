import { Component, OnInit } from '@angular/core';
import { ConciertoService } from '../../core/services/concierto.service';
import { Concierto } from '../../core/models/concierto.models';
import { Page } from '../../core/models/pagination.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conciertos-list',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss']
})
export class TicketsComponent implements OnInit {
  conciertos: Concierto[] = [];
  
  // Parámetros de paginación
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  sortBy: string = 'fechaHora,asc';

  constructor(private conciertoService: ConciertoService) {}

  ngOnInit(): void {
    this.cargarConciertos();
  }

  cargarConciertos(): void {
    this.conciertoService.fetchConciertos(this.currentPage, this.pageSize, this.sortBy)
      .subscribe({
        next: (response: Page<Concierto>) => {
          this.conciertos = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        },
        error: (err) => console.error('Error cargando conciertos', err)
      });
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPages) {
      this.currentPage = nuevaPagina;
      this.cargarConciertos();
    }
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.currentPage = 0; // Reiniciar a la primera página al cambiar el tamaño
    this.cargarConciertos();
  }
}