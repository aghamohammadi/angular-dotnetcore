import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsDemoRoutingModule } from './steps-demo-routing.module';
import { StepsDemoComponent } from './steps-demo.component';
import { UploadComponent } from './components/upload/upload.component';
import { FormComponent } from './components/form/form.component';
import { UserComponent } from './components/user/user.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StepsModule } from "primeng/steps";
import { CardModule } from "primeng/card";
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from "primeng/toast";
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    StepsDemoComponent,
    UploadComponent,
    FormComponent,
    UserComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    StepsDemoRoutingModule,
    StepsModule,
    CardModule,
    FileUploadModule,
    ProgressBarModule,
    TableModule,
    FormsModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class StepsDemoModule { }
