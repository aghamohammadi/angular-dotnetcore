import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
