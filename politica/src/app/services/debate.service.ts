import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDebate } from '../interfaces/debate';

const baseUrl = 'http://localhost:8080/api/debate';

@Injectable({
  providedIn: 'root'
})
export class DebateService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: IDebate): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getUserDebate(user_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/user/${user_id}`);
  }

  updateMany(user_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}update/${user_id}`, data);
  }
}