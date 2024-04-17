import { Component, signal, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../tasklist/task.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css'
})
export class TaskdetailComponent {
  //sorry, to je dočasne
  UpdateINFO: any;

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    @Inject('BASE_URL') baseUrl: string){

  }

  updName: string = "no data";
  updDescription: string = "no data";
  updPriority: number = 0;
  updDeadline: Date ;

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskDetails(id).subscribe(thtask => this.thtask.set(thtask));
  };

  
  thtask = signal<TaskDetailDTO>(undefined);



  updateForm = new FormGroup(
    {
      name: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(null),
      deadline: new FormControl(null),
    })
    /*      name: new FormControl(this.thtask().name, Validators.required),
      description: new FormControl(this.thtask().description, Validators.required),
      priority: new FormControl(this.thtask().priority, Validators.required),
      deadline: new FormControl(this.thtask().dateTime, Validators.required),*/


onEditTask() {
    this.taskService.EditTask({
      updName: this.updateForm.controls['name'].value,
      updDescription: this.updateForm.controls['description'].value,
      updPriority: this.updateForm.controls['priority'].value,
      updDeadline: this.updateForm.controls['deadline'].value,
    }).subscribe(UpdateINFO => this.UpdateINFO.set(UpdateINFO));
  };
}


export interface TaskUpdateDTO {
  updName: string;
  updDescription: string;
 updPriority: number;
 updDeadline: Date;
}

export interface TaskDetailDTO {
  name: string;
  description: string;
  priority: number;
  isDone: boolean;
  dateTime: Date;
}

