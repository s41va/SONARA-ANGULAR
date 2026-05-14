import { Injectable, inject } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { loadStripe } from '@stripe/stripe-js'; 
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private http = inject(HttpClient);
  private stripePromise = loadStripe(environment.stripeKey);

  async redirectToCheckout(conciertoId: number) {
    // 1. Llamada a tu API de Java
    // Asumimos que tu DTO ahora devuelve un campo 'url'
    const response = await firstValueFrom(
      this.http.post<{ url: string }>(`${environment.apiUrl}/pagos/checkout/${conciertoId}`, {})
    );

    if (response && response.url) {
      console.log('Redirigiendo a Stripe Checkout...');
      // 2. La nueva forma oficial: Redirección directa del navegador
      window.location.href = response.url;
    } else {
      throw new Error('El servidor no devolvió una URL de pago válida.');
    }
  }
}