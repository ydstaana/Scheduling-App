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

  static getUMA(id: string) {
    return this.api().users().getUMA(id);
  }

  static getFieldAdmin(id: string) {
    return this.api().users().getFieldAdmin(id);
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

  static updateProfile(user: any) {
    return this.api().users().updateProfile(user);
  }

  static updateStudent(user: any) {
    return this.api().users().updateStudent(user);
  }

  static updateUserGroups(userGroup: any) {
    return this.api().users().updateUserGroups(userGroup);
  }
}
