import { Component } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

}
