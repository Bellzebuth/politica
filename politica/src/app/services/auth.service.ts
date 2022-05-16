import { Injectable } from '@angular/core';
import { DbUser } from './model/db-user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/user';

const baseUrl = 'http://localhost:8080/api/auth/';
const baseUrlForgetters = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(baseUrl + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(user: IUser): Observable<any> {
    return this.http.post(baseUrl + 'signup', user, httpOptions);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(baseUrl + 'user/' + id, httpOptions);
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl, httpOptions);
  }

  getUser(id: any): Observable<any> {
    return this.http.get(baseUrl+ id, httpOptions);
  }

  update(id: any, data: IUser): Observable<any> {
    return this.http.put(`${baseUrl}${id}`, data);
  }

  checkEmail(email: any): Observable<any> {
    return this.http.get(`${baseUrlForgetters}email/${email}`, httpOptions);
  }

  checkUsername(username: any): Observable<any> {
    return this.http.get(`${baseUrlForgetters}username/${username}`, httpOptions);
  }
}
