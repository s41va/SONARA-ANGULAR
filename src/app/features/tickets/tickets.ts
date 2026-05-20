import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../core/services/stripe.service'; 
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.scss']
})
export class TicketsComponent {
  @Input() concierto: any | null = null; // O el tipo Concierto si lo tienes definido
  @Output() close = new EventEmitter<void>();

  // 1. Inyectamos el servicio que acabamos de crear
  private stripeService = inject(StripeService);

  cerrar(): void {
    this.close.emit();
  }

  // 2. Convertimos el método en async para manejar la redirección
  async comprar(): Promise<void> {
    if (this.concierto && this.concierto.id) {
      try {
        console.log('Iniciando proceso de compra para:', this.concierto.artista.nombre);
        
        // Llamamos al servicio de Stripe
        await this.stripeService.redirectToCheckout(this.concierto.id);
        
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        alert('Lo sentimos, hubo un error al conectar con la pasarela de pago. Inténtalo de nuevo.');
      }
    } else {
      console.warn('No hay datos del concierto para procesar la compra');
    }
  }
}