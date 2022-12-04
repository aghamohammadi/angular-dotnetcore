import { StepsDemoState } from '@store/steps-demo/steps-demo.state';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { StepsDemoUser } from '@shared/models/steps-demo-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as fromSelector from '@store/steps-demo/steps-demo.selectors';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit,OnDestroy {
  private unsubscribe$ = new Subject();

  stepsDemoInfo$: Observable<StepsDemoState>;
  selectedUsers!: StepsDemoUser[];
  transferdUsersStr: any;

  constructor(private store$: Store<StepsDemoState>, private messageService: MessageService, private router: Router, private route: ActivatedRoute) {
    this.stepsDemoInfo$ = this.store$
      .select(fromSelector.stateData);

   }

  ngOnInit() {
    this.stepsDemoInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: StepsDemoState) => {
        if (state && state.users && state.selectedUsers && state.selectedUsers.length > 0)
          this.selectedUsers = state.users.filter((user: StepsDemoUser) => state.selectedUsers.includes(user.id))

      }
      );
  }

  complete() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Completed!" });

  }

  prevPage() {
    this.router.navigate(['steps/user'], { queryParams: { user: this.transferdUsersStr }});
  }

  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }


}
