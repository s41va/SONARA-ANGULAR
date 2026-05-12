import { Component, OnInit } from '@angular/core';
import { ConciertoService } from '../../core/services/concierto.service';
import { Concierto } from '../../core/models/concierto.models';
import { Page } from '../../core/models/pagination.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conciertos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss']
})
export class TicketsComponent implements OnInit {
  conciertos: Concierto[] = [];

  // Parámetros de paginación
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  sortBy: string = 'fechaHora,asc';
  // Almacenan el valor actual de cada filtro
  filtroNombre: string = '';
  filtroFecha: string = '';
  filtroUbicacion: string = '';

  // Arrays de datos
  conciertosOriginales: Concierto[] = []; // Los datos que vienen del servicio (nunca se tocan)


  constructor(private conciertoService: ConciertoService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargarConciertos();
    }, 100);

  }

  cargarConciertos(): void {
  this.conciertoService.fetchConciertosPay(
    this.currentPage,
    this.pageSize,
    this.sortBy,
    this.filtroNombre,    
    this.filtroFecha,     
    this.filtroUbicacion
    )
    .subscribe({
      next: (response: Page<Concierto>) => {
        this.conciertos = response.content;
        this.conciertosOriginales = response.content; 
        
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

  // Filtro por Artista
  filtrarPorArtista(event: any): void {
    this.filtroNombre = event.target.value.toLowerCase();
    this.aplicarFiltros();
  }

  // Filtro por Fecha
  filtrarPorFecha(event: any): void {
    this.filtroFecha = event.target.value; // El input date ya devuelve "YYYY-MM-DD"
    this.aplicarFiltros();
  }

  // Filtro por Ubicación (Local o Ciudad)
  filtrarPorUbicacion(event: any): void {
    this.filtroUbicacion = event.target.value.toLowerCase();
    this.aplicarFiltros();
  }

  // LA FUNCIÓN MAESTRA: Aplica todos los filtros a la vez
  aplicarFiltros(): void {
    this.conciertos = this.conciertosOriginales.filter(concierto => {

      // Lógica para Artista
      const cumpleArtista = concierto.artista?.nombre?.toLowerCase().includes(this.filtroNombre);

      // Lógica para Ubicación (Busca en nombre del local Y en la ciudad)
      const datosUbicacion = `${concierto.local} ${concierto.localidad?.nombreCiudad}`.toLowerCase();
      const cumpleUbicacion = datosUbicacion.includes(this.filtroUbicacion);

      // Lógica para Fecha
      let cumpleFecha = true;
      if (this.filtroFecha) {
        // Formateamos la fecha del concierto para comparar solo el día (YYYY-MM-DD)
        const fechaC = new Date(concierto.fechaHora).toISOString().split('T')[0];
        cumpleFecha = (fechaC === this.filtroFecha);
      }

      // El concierto debe cumplir las tres condiciones
      return cumpleArtista && cumpleUbicacion && cumpleFecha;
    });

    // Al filtrar, solemos querer volver a la página 1
    this.currentPage = 0;
  }
  // En tu componente.ts

ejecutarFiltros(artista: string, fecha: string, ubicacion: string): void {
  // Actualizamos las variables de estado con los valores de los inputs
  this.filtroNombre = artista.toLowerCase();
  this.filtroFecha = fecha;
  this.filtroUbicacion = ubicacion.toLowerCase();

  // Ejecutamos la lógica de filtrado que ya teníamos
  this.aplicarFiltros();
}

limpiarFiltros(artista: HTMLInputElement, fecha: HTMLInputElement, ubicacion: HTMLInputElement): void {
  // Limpiamos los inputs físicamente
  artista.value = '';
  fecha.value = '';
  ubicacion.value = '';

  // Limpiamos las variables de estado
  this.filtroNombre = '';
  this.filtroFecha = '';
  this.filtroUbicacion = '';

  // Restauramos la lista original
  this.conciertos = [...this.conciertosOriginales];
  this.currentPage = 0;
}
}