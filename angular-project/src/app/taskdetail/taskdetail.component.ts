import { Component, signal, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../tasklist/task.service';

@Component({
  selector: 'app-taskdetail',
  standalone: true,
  imports: [],
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.css'
})
export class TaskdetailComponent {

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    @Inject('BASE_URL') baseUrl: string){

  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskDetails(id).subscribe(thtask => this.thtask.set(thtask));
  };

  thtask = signal<TaskDetailDTO>(undefined);


}

export interface TaskDetailDTO {
  name: string;
  description: string;
  priority: number;
  isDone: boolean;
  dateTime: Date;
}
