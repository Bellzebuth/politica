import { Injectable } from '@angular/core';
import { DbUser } from './model/db-user';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(userId: string) {
  }
}
