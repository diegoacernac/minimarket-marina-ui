import { Component } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
