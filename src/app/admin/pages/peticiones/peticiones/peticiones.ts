import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SolicitudArtistaCreateDTO, SolicitudArtistaDTO, SolicitudArtistaService, SolicitudArtistaUpdateDTO } from '../../../../core/services/peticiones.service';
@Component({
  selector: 'app-solicitudes-admin',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './peticiones.html',
  styleUrls: ['./peticiones.scss']
})
export class SolicitudesAdminComponent implements OnInit {
  solicitudes: SolicitudArtistaDTO[] = [];
  loading: boolean = false;

  constructor(private solicitudService: SolicitudArtistaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes(): void {
    this.loading = true;
    this.solicitudService.listarPendientes().subscribe({
      next: (data) => {
        this.solicitudes = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar solicitudes', err);
        this.solicitudes = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  aprobar(solicitud: SolicitudArtistaDTO): void {
    // Aquí podrías abrir un modal para editar antes de aprobar
    const updateDto: SolicitudArtistaUpdateDTO = {
      nombreArtista: solicitud.nombreArtista,
      generoSugerido: solicitud.generoSugerido
    };

    if (confirm(`¿Aprobar a ${solicitud.nombreArtista}?`)) {
      this.solicitudService.aprobarSolicitud(solicitud.id, updateDto).subscribe(() => {
        this.cargarPendientes();
      });
    }
  }

  rechazar(id: number): void {
    if (confirm('¿Estás seguro de rechazar esta solicitud?')) {
      this.solicitudService.rechazarSolicitud(id).subscribe(() => {
        this.cargarPendientes();
      });
    }
  }
}