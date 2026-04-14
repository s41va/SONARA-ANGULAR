import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, NgbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);
  private translate = inject(TranslateService);

  isLoggedIn$ = this.auth.isLoggedIn();
  isAdmin$    = this.auth.isAdmin();
  isManager$  = this.auth.isManager();
  currentLang = 'es';

  constructor() {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  logout(): void {
    this.auth.logout('/login');
  }
}