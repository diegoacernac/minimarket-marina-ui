import { Component } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css'
})
export class ProviderComponent {

}
