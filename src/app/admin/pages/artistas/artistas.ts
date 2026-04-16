import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// MODULOS
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// CLASES Y TIPOS
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// Asumiendo que crearás este servicio
import { ArtistaService } from '../../../core/services/artistas.service';

@Component({
  selector: 'app-artistas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterLink
  ],
  templateUrl: './artistas.html',
  styleUrl: './artistas.scss',
})
export class Artistas implements OnInit, AfterViewInit {
  // Coincide con las definiciones matColumnDef del HTML anterior
  displayedColumns: string[] = ['id', 'nombre', 'genero_id', 'votos_ranking', 'actions'];
  dataSource = new MatTableDataSource<any>([]); 

  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  sortColumn = 'nombre'; 
  sortDirection: 'asc' | 'desc' = 'asc';
  loading = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private artistaService: ArtistaService, 
    private router: Router
  ) {}

  ngOnInit() {
    // Timeout para evitar errores de ciclo de detección de cambios de Angular
    setTimeout(() => this.loadData());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.loading = true;
    this.error = null;

    this.artistaService.fetchArtistas(this.currentPage, this.pageSize, this.sortColumn).subscribe({
      next: (res: any) => {
        // Adaptado para manejar tanto arrays simples como respuestas paginadas de Spring
        this.dataSource.data = res.content || res;
        this.totalElements = res.totalElements || res.length;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al cargar los artistas';
        if (err.status === 403) this.router.navigate(['/forbidden']);
      },
    });
  }

  deleteArtist(id: number, nombre: string): void {
    const ok = confirm(`¿Estás seguro de que deseas eliminar al artista: ${nombre}?`);
    if (!ok) return;

    this.loading = true;
    this.error = null;

    this.artistaService.deleteArtista(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err: unknown) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) { this.router.navigate(['/login']); return; }
          if (err.status === 403) { this.router.navigate(['/forbidden']); return; }
          if (err.status === 404) { this.error = 'El artista ya no existe'; return; }
          if (err.status === 409) { this.error = 'No se puede eliminar: el artista tiene discos o canciones vinculadas'; return; }
        }
        this.error = 'Error al intentar borrar el artista';
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}