import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios-detail.html',
  styleUrl: './usuarios-detail.scss'
})
export class UsuarioDetail implements OnInit {
  usuario: Usuario | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUsuario(+id);
    }
  }

  loadUsuario(id: number): void {
    this.loading = true;
    this.usuarioService.fetchUsuarioById(id).subscribe({
      next: (response: any) => {
        // Mantenemos tu lógica de "unwrapping" por si el API devuelve un array o el objeto directo
        if (response && response.content) {
          this.usuario = response.content[0];
        } else {
          this.usuario = response;
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información del usuario.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}