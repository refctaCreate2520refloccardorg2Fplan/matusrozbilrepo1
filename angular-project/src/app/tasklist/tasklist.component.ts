import { DatePipe, NgFor, NgIf, CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, signal, Injectable, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { TaskService, CreateTaskDTO } from './task.service';
import { Router, RouterModule, ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskDetailDTO } from '../taskdetail/TaskDetailDTO';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, DatePipe, NgIf, CommonModule, RouterLink, MatTableModule, MatSortModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',

})
export class TasklistComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'hotovo'];

 sort: MatSort;

  constructor(
    private route: ActivatedRoute, http: HttpClient,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private taskService: TaskService,
    @Inject("BASE_URL") baseUrl: string) {
    http.get<TasksDTO[]>(baseUrl + '/tasks').subscribe(result => { this.TaskData = result; }, error => console.error(error));
  }


  ngAfterViewInit() {
    this.TaskData.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });

        this.TaskData.sort(function (a, b) {
      if (a.priority < b.priority) { return -1; }
      if (a.priority > b.priority) { return 1; }
      return 0;
    });

    this.TaskData.sort(function (a, b) {
      if (a.id < b.id) { return -1; }
      if (a.id > b.id) { return 1; }
      return 0;
    });

  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  taskName: string = "no data";
  taskDescription: string = "no data";
  taskPriority: number = 0;
  taskDeadline: Date;


  taskForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      priority: new FormControl(null, Validators.required),
      deadline: new FormControl(null, Validators.required),
    })



  public TaskData: TasksDTO[] = [];
  // newTask = signal<TasksDTO>(undefined);
  taskINFO = signal<CreateTaskDTO>(undefined);
  xd: boolean = false;
  taskIdFromRoute: number = 0;
  taskDetailInfo = signal<TaskDetailDTO>(undefined);
  onAddTask() {
    if (this.taskForm.valid) {
      this.taskService.createTask({
        taskName: this.taskForm.controls['name'].value,
        taskDescription: this.taskForm.controls['description'].value,
        taskPriority: this.taskForm.controls['priority'].value,
        taskDeadline: this.taskForm.controls['deadline'].value,
      }).subscribe(TaskINFO => this.taskINFO.set(TaskINFO), this.router.navigate['/tasklist']);
    }
  }

  onDelete() {
    this.taskService.deleteTask(this.taskIdFromRoute);
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
          }


  ngOnInit(): void {
    const RouteParams = this.route.snapshot.paramMap;
    this.taskIdFromRoute = Number(RouteParams.get('id'));
    console.log(RouteParams);
    this.taskService.getTaskDetails(this.taskIdFromRoute).subscribe(taskDetail => { this.taskDetailInfo.set(taskDetail); });
  }
}

export interface TasksDTO {
  id: number;
  name: string;
  description: string;
  priority: number;
  isDone: boolean;
  deadline: Date;
}

