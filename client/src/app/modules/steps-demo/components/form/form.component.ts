import { StepsDemoForm, StepsDemoStatus } from '@shared/models/steps-demo-form';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formInfo!: StepsDemoForm;
  minDateValue!: string ;
  maxDateValue!: string;
  selectedStatus!: StepsDemoStatus;
  statusItems!: StepsDemoStatus[];
  submitted: boolean = false;

  constructor(public stepsDemoService: StepsDemoService, private router: Router) {
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

  ngOnInit() {
    this.formInfo = this.stepsDemoService.getStepsDemoInfo().form;
  }

  onChange(event:any){
    this.formInfo.status = event.target.value;
  }

  nextPage() {
    if (this.formInfo.amount && this.formInfo.date && this.formInfo.status && this.formInfo.source) {
      this.stepsDemoService.stepsDemoInfo.form = this.formInfo;
      this.router.navigate(['steps/user']);

      return;
    }

    this.submitted = true;
  }

  prevPage() {
    this.router.navigate(['steps/upload']);
  }

}
