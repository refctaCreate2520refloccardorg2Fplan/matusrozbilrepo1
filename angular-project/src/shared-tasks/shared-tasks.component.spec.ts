import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTasksComponent } from './shared-tasks.component';

describe('SharedTasksComponent', () => {
  let component: SharedTasksComponent;
  let fixture: ComponentFixture<SharedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
