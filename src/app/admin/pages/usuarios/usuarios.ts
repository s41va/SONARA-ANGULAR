import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// MODULOS: Estos son los únicos que van en el array 'imports'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// CLASES Y TIPOS: Estos NO van en el array 'imports'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterLink
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit, AfterViewInit {
  // Ajustado a los campos de tu tabla SQL
  displayedColumns: string[] = ['usuario_id', 'nombre', 'email', 'fecha_registro', 'actions'];
  dataSource = new MatTableDataSource<any>([]); 

  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  sortColumn = 'nombre'; // Ordenar por nombre por defecto
  sortDirection: 'asc' | 'desc' = 'asc';
  loading = false;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.loading = true;
    this.error = null;

    // Asumimos que fetchUsuarios sigue la misma lógica de paginación
    this.usuarioService.fetchUsuarios(this.currentPage, this.pageSize, this.sortColumn).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.content || res;
        this.totalElements = res.totalElements || res.length;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al cargar los usuarios';
        if (err.status === 403) this.router.navigate(['/forbidden']);
      },
    });
  }

  deleteUser(id: number, nombre: string): void {
    const ok = confirm(`¿Seguro que quieres borrar al usuario ${nombre} (id=${id})?`);
    if (!ok) return;

    this.loading = true;
    this.error = null;

    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err: unknown) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) { this.router.navigate(['/login']); return; }
          if (err.status === 403) { this.router.navigate(['/forbidden']); return; }
          if (err.status === 404) { this.error = 'El usuario ya no existe'; return; }
          if (err.status === 409) { this.error = 'No se puede borrar: el usuario tiene datos vinculados'; return; }
        }
        this.error = 'Error al borrar el usuario';
      }
    });
  }

  // Helper para cambiar de página si usas MatPaginator con eventos
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
}