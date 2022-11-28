import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: "/"
      },
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-user',
        routerLink: "/admin"
      },
      {
        label: 'Steps',
        icon: 'pi pi-fw pi-steps',
        routerLink: "steps"
      }
    ];
  }

}
