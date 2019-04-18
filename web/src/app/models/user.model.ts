import { Model } from './model';

export enum UserType {
  UST_MEDICINE_ADMIN = 'UST Medicine Admin',
  FIELD_ADMIN = 'Field Admin',
  STUDENT = 'Student'
}

export class User extends Model {
  static create(user: any) {
    return this.api().users().create(user);
  }

  static getStudent(id: string) {
    return this.api().users().getStudent(id);
  }

  static list() {
    return this.api().users().list();
  }

  static listUnassignedStudents() {
    return this.api().users().listUnassignedStudents();
  }

  static listUserGroups() {
    return this.api().users().listUserGroups();
  }

  static login(email: string, password: string) {
    return this.api().users().login(email, password);
  }

  static update(user: any) {
    return this.api().users().update(user);
  }

  static updateUserGroups(userGroup: any) {
    return this.api().users().updateUserGroups(userGroup);
  }
}
