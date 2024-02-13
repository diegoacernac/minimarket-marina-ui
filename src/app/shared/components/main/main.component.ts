import { Component } from '@angular/core';
import { HeaderComponent } from '../layouts/header/header.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { SideNavComponent } from '../layouts/side-nav/side-nav.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent, 
    FooterComponent, 
    SideNavComponent,
    HomeComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  sideNavState = true
}
