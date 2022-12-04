import { StepsDemoService } from './../../core/services/steps-demo.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, debounceTime, delay, catchError, exhaustMap, takeUntil } from 'rxjs/operators';



import * as fromActions from './steps-demo.actions';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { serializeError } from 'serialize-error';
import { MessageService } from 'primeng/api';


@Injectable()

export class StepsDemoEffects {

  constructor(private actions$: Actions, private messageService: MessageService, private stepsDemoService: StepsDemoService) { }




  patchUpload$ = createEffect(() =>

    this.actions$.pipe(
      ofType(fromActions.uploadRequestAction),
      switchMap(action =>
        this.stepsDemoService.upload(action.file).pipe(
          takeUntil(
            this.actions$.pipe(
              ofType(fromActions.uploadCancelAction)
            )
          ),
          map((event) => this.getActionFromHttpEvent(event)),
          catchError((error) => [this.handleError(error)])
          ),


        )
    )
  );


  private getActionFromHttpEvent(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent: {
        return fromActions.uploadStartedAction();
      }
      case HttpEventType.UploadProgress: {
        return fromActions.uploadProgressAction({
          progress: Math.round((100 * event.loaded) / (event.total||1))
        });
      }
      // case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          this.messageService.add({ severity: 'info', summary: 'Success', detail: event.body.message });
          return fromActions.uploadCompletedAction({ imagePath: (event.body.url ||'') });
        } else {
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Could not upload the file!' });

          return fromActions.uploadFailureAction({
            error: event.statusText
          });
        }
      }
      default: {
        return fromActions.uploadFailureAction({
          error: `Unknown Event: ${JSON.stringify(event)}`
        });
      }
    }
  }

  private handleError(error: any) {
    const friendlyErrorMessage = serializeError(error).message;
    return fromActions.uploadFailureAction({
      error: friendlyErrorMessage
    });
  }



}
