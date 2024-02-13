import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  menus: Array<any> = []

  constructor(
    private authService: AuthService,
    private router: Router,  
  ) {}

  ngOnInit(): void {
    this.getUserMenus()
  }

  getUserMenus(): void {
    this.menus = this.authService.getUserMenus()
  }

  goToModule(module: string): void {
    this.router.navigate([module])
  }
}
