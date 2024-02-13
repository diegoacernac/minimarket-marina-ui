import { Component } from '@angular/core';
import { MainComponent } from '../../shared/components/main/main.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
