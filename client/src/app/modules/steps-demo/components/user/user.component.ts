import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnInit } from '@angular/core';
import { StepsDemoUser } from '@shared/models/steps-demo-user';

@Component({
  selector: 'app-table',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  selectedUsers: StepsDemoUser[]=[];
  users!: StepsDemoUser[];

  constructor(public stepsDemoService: StepsDemoService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.users = this.stepsDemoService.getStepsDemoInfo().users;


    this.route.queryParams
      .subscribe(params => {
        let transferdUsers = params["user"]?.split(',').map((str: any) => Number(str));;

        if (transferdUsers) {
          this.selectedUsers = this.users?.filter((user: StepsDemoUser) => transferdUsers.includes(user.id))
        }
      }
      );

  }



  onRowSelect(event:any) {
    this.selectedUsers.push(event.data)
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.firstname });
  }

  onRowUnselect(event: any) {
    this.selectedUsers = this.selectedUsers.filter(function (obj) {
      return obj.id !== event.data.id;
    });

    this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.firstname });
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

}
