import { Store } from '@ngrx/store';
import { StepsDemoState } from '@store/steps-demo/steps-demo.state';
import { Observable, take, Subject, takeUntil } from 'rxjs';
import { StepsDemoForm, StepsDemoStatus } from '@shared/models/steps-demo-form';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as fromSelector from '@store/steps-demo/steps-demo.selectors';
import * as fromActions from '@store/steps-demo/steps-demo.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  formInfo!: FormGroup;
  minDateValue!: string ;
  maxDateValue!: string;
  selectedStatus!: StepsDemoStatus;
  statusItems!: StepsDemoStatus[];
  submitted: boolean = false;

  constructor(private store$: Store<StepsDemoState>,  private router: Router) {
    this.init();
  }

  ngOnInit() {
    this.initForm();
    this.getFormInfo();
  }

  private getFormInfo() {
    this.store$
      .select(fromSelector.formData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((form: any) =>
        this.formInfo.patchValue(form, { emitEvent: false })
      );
  }

  private initForm() {
    this.formInfo = new FormGroup({
      amount: new FormControl(null, [Validators.required]),
      date: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      source: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    });
  }

  private init() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    this.minDateValue = date.toISOString().split('T')[0];
    date.setDate(date.getDate() + 4);
    this.maxDateValue = date.toISOString().split('T')[0];
    this.statusItems = [
      { text: 'Active', id: 1 },
      { text: 'DeActive', id: 2 },
      { text: 'Pending', id: 0 },
      { text: 'Removed', id: -1 }
    ];
  }


  nextPage() {
    if (this.formInfo.valid) {
      this.store$.dispatch(fromActions.patchForm({ payload: {...this.formInfo.value} }));

      this.router.navigate(['steps/user']);

      return;
    }

    this.submitted = true;
  }

  prevPage() {
    this.router.navigate(['steps/upload']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }

}
