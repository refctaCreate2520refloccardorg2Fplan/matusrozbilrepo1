import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TaskDetailDTO } from 'src/app/taskdetail/TaskDetailDTO';
import { TaskService } from 'src/app/tasklist/task.service';
import { SearchFilterPipe } from '../app/tasklist/search-filter.pipe';

@Component({
  selector: 'app-shared-tasks',
  standalone: true,
  imports: [SearchFilterPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './shared-tasks.component.html',
  styleUrl: './shared-tasks.component.css'
})
export class SharedTasksComponent {
  private destroy$ = new Subject<void>();
  sharedTasks = signal<TaskDetailDTO[]>([]);
  taskService = inject(TaskService);

  getSharedTasks(){
    this.taskService.getSharedTask()
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => this.sharedTasks.set(value));
  }

  searchTerm: string;
/*
destroyRef = inject(DestroyRef);

taskData = signal<TasksDTO[]>([]);
xd: boolean = false;
taskForm = new FormGroup(
  {
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
  })

constructor(
  http: HttpClient,
  private taskService: TaskService,

  @Inject("BASE_URL") baseUrl: string) {
  http.get<TasksDTO[]>(baseUrl + '/tasks').subscribe(result => { this.taskData.set(result) }, error => console.error(error.message));
}
deletni = signal<TaskDetailDTO>(undefined);

onAddTask() {
  if (this.taskForm.valid) {
    this.taskService.createTask({
      taskName: this.taskForm.controls['name'].value,
      taskDescription: this.taskForm.controls['description'].value,
      taskPriority: this.taskForm.controls['priority'].value,
      taskDeadline: this.taskForm.controls['deadline'].value,
    }).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(taskInfo => this.taskData.update(tasks => [...tasks, taskInfo]));
  }
}


onDelete(id: number) {
  this.taskService.deleteTask(id).pipe(takeUntil(this.destroy$)).subscribe(() => this.taskData.update(tasks => tasks.filter(task => task.id !== id)));
} 



tglbtn() {
  var elem = document.getElementById("tglbttn");
  if (elem.innerHTML=="Show finished tasks")
  {
    elem.innerHTML = "Show unfinished tasks";
    this.xd = true;
  }

  else
  {
    elem.innerHTML = "Show finished tasks";
    this.xd = false;
  }
} */
}


