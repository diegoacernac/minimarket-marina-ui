import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../pages/home/home.component';
import { AuthService } from '../../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { iconsfa } from '../../../utils/font-awesome-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [HomeComponent, FontAwesomeModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent implements OnInit {
  @Input() sideNavState: boolean = false

  username: string = ''
  menus: Array<any> = []
  
  rightArrow = iconsfa.right
  leftArrow = iconsfa.left
  closeSession = iconsfa.rightToBracket
  user = iconsfa.user
  
  isSideBarCollapsed: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserData()
    this.getUserMenus()
    this.setIconsMenu()
  }

  getUserData(): void {
    this.username = this.authService.getUserData().fullName
  }

  getUserMenus(): void {
    this.menus = this.authService.getUserMenus()
  }

  setIconsMenu(): void {
    let icons: { [key: string]: IconDefinition } = {
      tools: iconsfa.gears,
      orders: iconsfa.boxOpen,
      users: iconsfa.usersGear,
      providers: iconsfa.userTie,
      reports: iconsfa.file,
      categories: iconsfa.appleWhole,
      products: iconsfa.boxesStacked,
    }

    this.menus.forEach((menu: any) => {
      if (icons.hasOwnProperty(menu.comand)) {
        menu.iconfa = icons[menu.comand]
      }
    })
  }

  toggleSideBar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed
  }

  goToSelectedPage(route: string): void {
    this.router.navigate([`/${route}`])
  }

  logOut(): void {
    this.authService.logOut();
  }
}
