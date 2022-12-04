import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { StepsDemoForm } from '@shared/models/steps-demo-form';
import { StepsDemoUpload, UploadStatus } from '@shared/models/steps-demo-upload';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StepsDemoService {

  //  stepsDemoInfo: {
  //   upload: StepsDemoUpload,
  //   form: StepsDemoForm;
  //    users: StepsDemoUser[];
  // }={
  //      upload: {
  //       status: UploadStatus.Ready,
  //       imagePath:null,
  //       fileData:null,
  //       progress:null,
  //        error:null,
  //     },
  //      form:{},
  //      users: [
  //       { id: 1, firstname: 'Ahmad', lastname: 'Aghamohammadi', age :31},
  //       { id: 2, firstname: 'Lionel', lastname: 'Messi', age :35},
  //       { id: 3, firstname: 'Cristiano', lastname: 'Ronaldo', age :38},
  //       { id: 4, firstname: 'Neymar', lastname: 'JR', age :30},
  //       { id: 5, firstname: 'Andres', lastname: 'Iniesta', age :38},
  //     ]

  // };

  constructor(private http: HttpClient) {


   }



  getStepsDemoInfo() {
    //console.log(this.stepsDemoInfo);

    // return this.stepsDemoInfo;
  }
  complete() {
    // console.log(this.stepsDemoInfo);

  }



  // uploadImage(event: any): { task: AngularFireUploadTask, fileRef: any }  {
  //   const file = event.files[0];
  //   var date = Date.now();

  //   const filePath = `Images/${date}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   return { task, fileRef }

  // }
  upload(file: File): Observable<any> {
    console.log('upload');
    const formData: FormData = new FormData();
    formData.append('file', file,file.name);
    // const headers = new HttpHeaders({
    //   // 'Authorization': 'Bearer ' + environment.apiKey ,
    //   'Accept': 'application/json' ,
    //   'Content-Type': 'application/json' ,
    // });


    return this.http.post(environment.apiUrl, formData,
      { reportProgress: true, observe: 'events' });

  }

}
