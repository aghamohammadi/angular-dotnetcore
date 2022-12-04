import { selectedUsersData } from './../../../../store/steps-demo/steps-demo.reducers';
import { Store } from '@ngrx/store';
import { StepsDemoState } from '@store/steps-demo/steps-demo.state';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { StepsDemoService } from '@core/services/steps-demo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as fromSelector from '@store/steps-demo/steps-demo.selectors';
import * as fromActions from '@store/steps-demo/steps-demo.actions';

@Component({
  selector: 'app-table',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  selectedUsers: StepsDemoUser[]=[];
  users$: Observable<StepsDemoUser[]>;

  constructor(private store$: Store<StepsDemoState>, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    this.users$ = this.store$
      .select(fromSelector.usersData);

    this.store$
      .select(fromSelector.selectedUsersData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedUsers: number[]) => {

        if (selectedUsers && selectedUsers.length>0) {
          this.users$
            .pipe(takeUntil(this.unsubscribe$)).subscribe((items: StepsDemoUser[]) =>
            this.selectedUsers = items.filter((user: StepsDemoUser) => selectedUsers.includes(user.id))
          );
        }
      }
      );
  }

  ngOnInit() {
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
      const users: number[] = this.selectedUsers.map(item => item.id);
      this.store$.dispatch(fromActions.patchSelectedUsers({ payload: users }));
      this.router.navigate(['steps/summary']);
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
