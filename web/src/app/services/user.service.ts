import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  create(user: any) {
    return User.create(user);
  }

  listUsers() {
    return User.list();
  }

  login(username: string, password: string) {
    return User.login(username, password);
  }
}
