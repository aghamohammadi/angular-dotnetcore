import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  //Public routes goes here
  {
    path: '',
    component: LayoutComponent,
    data: {},
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'steps',
        loadChildren: () =>
          import('@modules/steps-demo/steps-demo.module').then(m => m.StepsDemoModule)
      }
    ]
  },
  //Admin routes goes here
  {
    path: 'admin',
    component: AdminLayoutComponent,
    data: {},
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
