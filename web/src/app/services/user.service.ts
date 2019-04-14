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

  listUserGroups() {
    return User.listUserGroups();
  }

  login(email: string, password: string) {
    return User.login(email, password);
  }

  update(user: any) {
    return User.update(user);
  }

  updateUserGroups(userGroup: any) {
    return User.updateUserGroups(userGroup);
  }
}
