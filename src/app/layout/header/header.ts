import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  // Inyecciones modernas
  private auth = inject(AuthService);
  private translate = inject(TranslateService);

  // Observable de estado
  isLoggedIn$ = this.auth.isLoggedIn();

  constructor() {
    // Configuración inicial
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  logout(): void {
    this.auth.logout('/login');
  }
}
