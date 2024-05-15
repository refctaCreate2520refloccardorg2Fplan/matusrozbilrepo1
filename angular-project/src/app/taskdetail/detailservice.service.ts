import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TaskDetailDTO } from './TaskDetailDTO';

@Injectable({
  providedIn: 'root'
})
export class DetailserviceService {

 

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}
 
}

