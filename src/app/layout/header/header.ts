import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoggedIn$!:Observable<Boolean>;
  constructor(private auth: AuthService){
    this.isLoggedIn$=this.auth.isLoggedIn();
  }
  logout():void{
    this.auth.logout('/login');
  }
}
