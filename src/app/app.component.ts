import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/layouts/header/header.component';
import { SideNavComponent } from './shared/components/layouts/side-nav/side-nav.component';
import { FooterComponent } from './shared/components/layouts/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'minimarket-ui'
  isLogged: boolean = false
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAccessToken()  
  }

  getAccessToken(): boolean {
    let token = localStorage.getItem('access_token')
    /* if (token) {
      this.router.navigate(['/home'])
    } */
    return this.isLogged = token ? true : false
  }
}
