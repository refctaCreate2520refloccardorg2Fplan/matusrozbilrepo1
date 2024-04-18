import { Component, signal, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../tasklist/task.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskDetailDTO } from './TaskDetailDTO';


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
  updateForm = new FormGroup(
    {
      name: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(null),
      deadline: new FormControl(null),
    })

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    @Inject('BASE_URL') baseUrl: string){

  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskDetails(id).subscribe(thtask => {
      // this.thtask.set(thtask);
      this.updateForm.patchValue({
        name: thtask.name,
        description: thtask.description,
        priority: thtask.priority,
        deadline: thtask.deadline
      });
    });
  };
    /*      name: new FormControl(this.thtask().name, Validators.required),
      description: new FormControl(this.thtask().description, Validators.required),
      priority: new FormControl(this.thtask().priority, Validators.required),
      deadline: new FormControl(this.thtask().dateTime, Validators.required),*/


onEditTask() {
    this.taskService.EditTask({
      name: this.updateForm.controls['name'].value,
      description: this.updateForm.controls['description'].value,
      priority: this.updateForm.controls['priority'].value,
      deadline: this.updateForm.controls['deadline'].value,
      id: parseInt(this.route.snapshot.paramMap.get('id'))
    }).subscribe({
      next: (response) => {},
      error: (er) => {console.log(er)}
    });
  };
}


export interface TaskUpdateDTO {
  updName: string;
  updDescription: string;
 updPriority: number;
 updDeadline: Date;
}



