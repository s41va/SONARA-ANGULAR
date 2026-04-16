import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

import { ConciertoService } from '../../../core/services/concierto.service';

@Component({
  selector: 'app-conciertos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterLink],
  templateUrl: './conciertos.html',
  styleUrl: './conciertos.scss'
})
export class Conciertos implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'artista_nombre', 'fecha_hora', 'local', 'actions'];
  dataSource = new MatTableDataSource<Conciertos>([]);

  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  loading = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private conciertoService: ConciertoService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.loadData());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  onPageChange(event: any) {
    this.currentPage = event.pageIndex; // Angular Material empieza en 0
    this.pageSize = event.pageSize;
    this.loadData(); // Recargamos los datos con la nueva página
  }


  loadData() {
    this.loading = true;
    this.error = null;

    // Enviamos currentPage y pageSize actuales al servidor
    this.conciertoService.fetchConciertos(this.currentPage, this.pageSize, 'fechaHora').subscribe({
      next: (res: any) => {
        // Si usas Spring Boot (Pageable), los datos vienen en res.content
        this.dataSource.data = res.content || res;
        this.totalElements = res.totalElements || res.length;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al cargar los conciertos';
        if (err.stats === 403) this.router.navigate(['/forbidden']);
      }
    });
  }

  deleteConcierto(id: number, artista: string) {
    if (!confirm(`¿Eliminar el concierto de ${artista}?`)) return;
    
    this.conciertoService.deleteConcierto(id).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        if (err.status === 403) this.router.navigate(['/forbidden']);
        this.error = 'No se pudo eliminar el concierto';
      }
    });
  }
}