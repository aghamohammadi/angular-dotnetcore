import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  selectedUsers: StepsDemoUser[]=[];
  users!: StepsDemoUser[];

  constructor(public stepsDemoService: StepsDemoService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.users = this.stepsDemoService.getStepsDemoInfo().users;
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        let transferdUsers = params["user"]?.split(',').map((str: any) => Number(str));;

        if (transferdUsers) {
          this.selectedUsers = this.users?.filter((user: StepsDemoUser) => transferdUsers.includes(user.id))
        }
      }
      );
  }



  onRowSelect(event:any) {
    console.log('onRowSelect');
    this.messageService.add({ severity: 'info', summary: 'User Selected', detail: event.data.firstname });
  }

  onRowUnselect(event: any) {
    console.log('onRowUnselect');
    this.messageService.add({ severity: 'info', summary: 'User Unselected', detail: event.data.firstname });
  }


  nextPage() {
    if (this.selectedUsers && this.selectedUsers.length>0) {
      this.router.navigate(['steps/summary'], { queryParams: { user: this.selectedUsers.map(o => o.id).join(',') } });
      return;
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Error', detail: "Please select user!" });

    }

  }


  prevPage() {
    this.router.navigate(['steps/form']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
