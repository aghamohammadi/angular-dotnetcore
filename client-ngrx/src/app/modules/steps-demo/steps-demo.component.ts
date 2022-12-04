import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";


@Component({
  selector: 'app-steps-demo',
  templateUrl: './steps-demo.component.html',
  styleUrls: ['./steps-demo.component.scss']
})
export class StepsDemoComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit fff');
    this.items = [
      { label: "Upload", routerLink:"upload" },
      { label: "Form", routerLink: "form" },
      { label: "User", routerLink: "user" },
      { label: "Summary", routerLink: "summary" },
    ];
  }

}
