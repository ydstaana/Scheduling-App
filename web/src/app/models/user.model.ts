import { Model } from './model';

export class User extends Model {
  static login(username: string, password: string) {
    return this.api().users().login(username, password);
  }
}
