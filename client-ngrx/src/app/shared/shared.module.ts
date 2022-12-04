import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';



@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    MenubarModule
  ],
  exports: [
    NavComponent
  ]
})
export class SharedModule { }
