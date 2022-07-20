import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { SummaryComponent } from './components/summary/summary.component';
import { UserComponent } from './components/user/user.component';
import { UploadComponent } from './components/upload/upload.component';
import { StepsDemoComponent } from './steps-demo.component';

const routes: Routes = [
  {
    path: '', component: StepsDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full',

      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'summary',
        component: SummaryComponent
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepsDemoRoutingModule { }
