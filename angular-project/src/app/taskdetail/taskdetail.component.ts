import { Component, signal, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../tasklist/task.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskDetailDTO } from './TaskDetailDTO';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule, HttpClientModule, CommonModule],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css',
  providers: [TaskService],

})
export class TaskdetailComponent {
  //sorry, to je dočasne

  private destroy$ = new Subject<void>();
  UpdateINFO: any;
  updateForm = new FormGroup(

    {
      name: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(null),
      deadline: new FormControl(null),
      imageUrl: new FormControl(''),
    })

  storedImageUrl: string | null = null;

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string){

  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskDetails(id).subscribe(thtask => {
      this.thtask.set(thtask);
      this.updateForm.patchValue({
        name: thtask.name,
        description: thtask.description,
        priority: thtask.priority,
        deadline: thtask.deadline,
        imageUrl: thtask.imageUrl
      });
    });
  };
    /*      name: new FormControl(this.thtask().name, Validators.required),
      description: new FormControl(this.thtask().description, Validators.required),
      priority: new FormControl(this.thtask().priority, Validators.required),
      deadline: new FormControl(this.thtask().dateTime, Validators.required),*/

  thtask = signal<TaskDetailDTO>(undefined);

onEditTask() {
  const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskService.EditTask({
      name: this.updateForm.controls['name'].value,
      description: this.updateForm.controls['description'].value,
      priority: this.updateForm.controls['priority'].value,
      deadline: this.updateForm.controls['deadline'].value,
      imageUrl: this.updateForm.controls['imageUrl'].value,
      id: parseInt(this.route.snapshot.paramMap.get('id'))
    }).subscribe({
      next: (thtask) => {this.thtask.set(thtask)},
      error: (er) => {console.log(er)}
    });
    //this.taskService.saveUrl( this.updateForm.controls['imgUrl'].value, id).pipe(takeUntil(this.destroy$)).subscribe();
  };


}

export interface TaskUpdateDTO {
 updName: string;
 updDescription: string;
 updPriority: number;
 updDeadline: Date;
}



