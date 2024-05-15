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
  deletni = signal<TaskDetailDTO>(undefined);
  ngAfterViewInit() {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("myTable");
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD");
          y = rows[i + 1].getElementsByTagName("TD");
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }

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

  onDelete(id: number) {
    
    this.taskService.deleteTask(id).
      subscribe();
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

