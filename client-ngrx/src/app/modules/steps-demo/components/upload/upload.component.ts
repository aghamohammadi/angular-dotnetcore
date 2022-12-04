import { StepsDemoUpload } from './../../../../shared/models/steps-demo-upload';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StepsDemoState } from './../../../../store/steps-demo/steps-demo.state';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import * as fromSelector from '@store/steps-demo/steps-demo.selectors';
import * as fromActions from '@store/steps-demo/steps-demo.actions';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  imagePath$: Observable<string|undefined>;
  completed$: Observable<boolean>;
  progress$: Observable<number>;
  error$: Observable<string>;
  isInProgress$: Observable<boolean>;
  isReady$: Observable<boolean>;
  hasFailed$: Observable<boolean>;
  private unsubscribe$ = new Subject();


  constructor(private store$: Store<StepsDemoState>, private router: Router) {

    this.imagePath$ = this.store$.select(fromSelector.uploadFilePath);
    this.completed$ = this.store$.select(fromSelector.uploadCompleted);
    this.progress$ = this.store$.select(fromSelector.uploadProgress);
    this.error$ = this.store$.select(fromSelector.uploadError);
    this.isInProgress$ = this.store$.select(fromSelector.uploadInProgress);
    this.hasFailed$ = this.store$.select(fromSelector.uploadFailed);
    this.isReady$ = this.store$.select(fromSelector.uploadReady);

  }

  ngOnInit() {
  }

  onBeforeUpload(event: any){

  }

  onUpload(event: any) {

  }

  uploadHandler(postData: any, fileUpload: any) {
    if (postData && postData.files.length > 0) {
      console.log('uploadHandler');

      this.store$.dispatch(fromActions.uploadRequestAction({ file: postData.files[0] }));
      fileUpload.clear();



    }
  }

  resetUpload() {
    this.store$.dispatch(fromActions.uploadResetAction());
  }

  cancelUpload() {
    this.store$.dispatch(fromActions.uploadCancelAction());
  }

  nextPage() {
    console.log('nextPage');
    this.router.navigate(['steps/form']);
    return;

  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }

}
