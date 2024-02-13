import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { iconsfa } from '../../../utils/font-awesome-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToogled = new EventEmitter<boolean>()
  menuState = true
  menu = iconsfa.bars

  constructor() { }

  ngOnInit(): void {
    
  }

  toggledSide() {
    this.menuState = !this.menuState
    this.sideNavToogled.emit(this.menuState)
  }
}
