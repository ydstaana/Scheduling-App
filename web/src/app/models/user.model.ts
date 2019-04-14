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

  static list() {
    return this.api().users().list();
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
