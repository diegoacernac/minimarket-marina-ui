import { Component } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
