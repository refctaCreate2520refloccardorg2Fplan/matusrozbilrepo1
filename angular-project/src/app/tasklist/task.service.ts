import { Injectable, Inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailDTO } from '../taskdetail/TaskDetailDTO';
import { TasksDTO } from './task';


@Injectable({
  providedIn: 'root'
})



export class TaskService {

  getTasks() {
   return this.http.get<TasksDTO[]>(this.baseUrl + '/tasks');
  }
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) { }

  createTask(Task: CreateTaskDTO) {
    return this.http.put<TasksDTO>(this.baseUrl + '/tasklist', Task);
  };

  getTaskDetails(id: number){
    return this.http.get<TaskDetailDTO>(this.baseUrl + "/taskdetail/" + id);
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseUrl + '/tasklist/' + id);
  }

  EditTask(task: TaskDetailDTO) {
    return this.http.put<TaskDetailDTO>(this.baseUrl + '/editTask', task);
  }

  joinTask(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.put<SharedTasksDTO>(this.baseUrl + '/users/joinTask', null, { params: queryParams });  //{ params: queryParams })
  }
  getSharedTask(){
    return this.http.get<TaskDetailDTO[]>(this.baseUrl + '/returnSharedTasks');
  }
  getUserID() {
    return this.http.get<string>(this.baseUrl + '/skuska');
  }

}


export interface JoinSharedTaskDTO {
  id: number;
}


export interface TaskUpdateDTO {
  updName: string;
  updDescription: string;
  updPriority: number;
  updDeadline: Date;
}

export interface CreateTaskDTO {
  taskName: string;
  taskDescription: string;
  taskPriority: number;
  taskDeadline: Date;
}

export interface SharedTasksDTO {
 id: number;
 name: string;
 description: string;
 priority: number;
 isdone: boolean;
}
