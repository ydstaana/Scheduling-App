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

  getStudent(id: string) {
    return User.getStudent(id);
  }

  getUMA(id: string) {
    return User.getUMA(id);
  }

  getFieldAdmin(id: string) {
    return User.getFieldAdmin(id);
  }

  listUnassignedStudents() {
    return User.listUnassignedStudents();
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

  updateProfile(user: any) {
    return User.updateProfile(user);
  }

  updateUserGroups(userGroup: any) {
    return User.updateUserGroups(userGroup);
  }
}
