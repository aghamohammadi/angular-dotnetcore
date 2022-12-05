import { StepsDemoForm, StepsDemoStatus } from '@shared/models/steps-demo-form';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formInfo!: FormGroup;
  minDateValue!: string ;
  maxDateValue!: string;
  selectedStatus!: StepsDemoStatus;
  statusItems!: StepsDemoStatus[];
  submitted: boolean = false;

  constructor(public stepsDemoService: StepsDemoService, private router: Router) {
    this.init();
  }



  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    const formInfo = this.stepsDemoService.getStepsDemoInfo().form;

    this.formInfo = new FormGroup({
      amount: new FormControl(formInfo?.amount, [Validators.required]),
      date: new FormControl(formInfo?.date, Validators.required),
      status: new FormControl(formInfo?.status, Validators.required),
      source: new FormControl(formInfo?.source, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
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
      this.stepsDemoService.stepsDemoInfo.form = {...this.formInfo.value};
      this.router.navigate(['steps/user']);
      return;
    }

    this.submitted = true;
  }

  prevPage() {
    this.router.navigate(['steps/upload']);
  }

}
