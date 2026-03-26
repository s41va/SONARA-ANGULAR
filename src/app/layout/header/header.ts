import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);

  // 1. LLAMAMOS a la función del servicio para obtener el Observable
  isLoggedIn$ = this.auth.isLoggedIn();
  logout():void{
    this.auth.logout('/login');
  }
}
