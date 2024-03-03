import { Injectable, Inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TaskService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  createTask(Task: CreateTaskDTO) {
    return this.http.put<CreateTaskDTO>(this.baseUrl + '/tasklist', Task);
  };
}


export interface CreateTaskDTO {
  taskName: string;
  taskDescription: string;
  taskPriority: number;
}

