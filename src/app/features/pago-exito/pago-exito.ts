import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-pago-exito',
  standalone: true,
  imports: [CommonModule, RouterModule, QRCodeComponent],
  templateUrl: './pago-exito.html',
  styleUrls: ['./pago-exito.scss']
})
export class PagoExitoComponent implements OnInit {
  artistaNombre: string = '';
  lugarConcierto: string = '';
  fechaConcierto: string = '';
  descripcionConcierto: string = ''; 
  precioConcierto: string = '';      

  private route = inject(ActivatedRoute);
  public sessionId: string = '';

  ngOnInit() {
    const params = this.route.snapshot.queryParamMap;

    this.sessionId = params.get('session_id') || '';
    this.artistaNombre = params.get('artista') || 'tu artista favorito';
    this.lugarConcierto = params.get('lugar') || 'Recinto oficial';
    this.descripcionConcierto = params.get('descripcion') || '';
    this.precioConcierto = params.get('precio') || '0.00€';
    
    const fechaRaw = params.get('fecha');
    if (fechaRaw) {
      try {
        const fechaObj = new Date(fechaRaw);
        this.fechaConcierto = fechaObj.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) + ' - ' + fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + 'h';
      } catch (e) {
        this.fechaConcierto = fechaRaw;
      }
    } else {
      this.fechaConcierto = 'Fecha por confirmar';
    }
  }
}