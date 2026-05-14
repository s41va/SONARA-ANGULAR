import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-pago-exito',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    QRCodeComponent
  ],
  templateUrl: './pago-exito.html',
  styleUrls: ['./pago-exito.scss']
})
export class PagoExitoComponent implements OnInit {
  artistaNombre: string = 'Nombre del Artista'; 

  private route = inject(ActivatedRoute);
  public sessionId: string = '';

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id') || '';
  }
}