import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsDemoComponent } from './steps-demo.component';

describe('StepsDemoComponent', () => {
  let component: StepsDemoComponent;
  let fixture: ComponentFixture<StepsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
