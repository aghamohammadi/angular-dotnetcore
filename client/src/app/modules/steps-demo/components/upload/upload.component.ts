import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadedFile: any;
  uploadPercent: any;
  progress: number = 0;

  imagePath!: string;


  submitted: boolean = false;

  constructor(public stepsDemoService: StepsDemoService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.imagePath = this.stepsDemoService.getStepsDemoInfo().upload.imagePath;
  }

  onBeforeUpload(event: any){

  }

  onUpload(event: any) {

  }

  uploadHandler(postData: any, fileUpload: any) {
    if (postData) {

      this.stepsDemoService.upload(postData.files[0]).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.imagePath = event.body.url;
            this.stepsDemoService.stepsDemoInfo.upload.imagePath = this.imagePath;
            this.messageService.add({ severity: 'info', summary: 'Success', detail: event.body.message });
            fileUpload.clear();
          }
        },
        error: (err: any) => {
          this.progress = 0;
          if (err.error && err.error.message) {
            this.messageService.add({ severity: 'error', summary: 'error', detail: err.error.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'error', detail: 'Could not upload the file!' });

          }

        }
      });
    }




  }

  nextPage() {
    console.log('nextPage');
    // if (this.imagePath) {
      this.router.navigate(['steps/form']);
      return;
    // }
    // else{
    //   this.messageService.add({ severity: 'info', summary: 'Error', detail: "Please upload image!" });

    // }

  }

}
