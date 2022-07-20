import { MessageService } from 'primeng/api';
import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  stepsDemoInfo: any;
  selectedUsers!: StepsDemoUser[];
  transferdUsersStr: any;

  constructor(public stepsDemoService: StepsDemoService, private messageService: MessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.stepsDemoInfo = this.stepsDemoService.getStepsDemoInfo();

    this.route.queryParams
      .subscribe(params => {
        this.transferdUsersStr = params["user"];
        let transferdUsers = this.transferdUsersStr?.split(',').map((str:any) => Number(str));;

        if (transferdUsers){
          this.selectedUsers = this.stepsDemoInfo.users?.filter((user: StepsDemoUser) => transferdUsers.includes(user.id))
        }
      }
      );

  }

  complete() {
    this.stepsDemoService.complete();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Completed!" });

  }

  prevPage() {
    this.router.navigate(['steps/user'], { queryParams: { user: this.transferdUsersStr }});
  }

}
