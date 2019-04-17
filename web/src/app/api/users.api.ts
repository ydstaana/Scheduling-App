import { Api } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserType } from '../models/user.model';

export class UsersApi extends Api {
  constructor(
    private http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(user: any) {
    return this.http.post(
      `${this.baseUrl}/users`,
      {
        ...user,
        isActive: true
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  list() {
    return this.http.get(`${this.baseUrl}/users`).toPromise();
  }

  listUnassignedStudents() {
    return this.http.get(`${this.baseUrl}/users/students/unassigned`).toPromise();
  }

  listUserGroups() {
    return this.http.get(`${this.baseUrl}/groups`).toPromise();
  }

  login(email: string, password) {
    return this.http.post(
      `${this.baseUrl}/login`,
      {
        email: email,
        password: password
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  update(user: any) {
    return this.http.put(
      `${this.baseUrl}/users/${user._id}`,
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateUserGroups(userGroup: any) {
    return this.http.post(
      `${this.baseUrl}/groups/addStudent`,
      userGroup,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
