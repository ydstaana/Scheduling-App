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

  getStudent(id: string) {
    return this.http.get(`${this.baseUrl}/users/students/${id}`).toPromise();
  }

  getUMA(id: string) {
    return this.http.get(`${this.baseUrl}/users/med-admins/${id}`).toPromise();
  }

  getFieldAdmin(id: string) {
    return this.http.get(`${this.baseUrl}/users/field-admins/${id}`).toPromise();
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

  listResetPasswordRequests() {
    return Promise.resolve([
      {
        _id: '12312321',
        student: {
          email: 'test@gmail.com'
        },
        isApproved: false,
        isPending: true
      }
    ]);
  }


  updateResetPasswordRequest(id: string, req: any) {
    return Promise.resolve(req);
  }

  update(user: any) {
    return this.http.put(
      `${this.baseUrl}/users/${user._id}`,
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateProfile(user: any) {
    return this.http.put(
      `${this.baseUrl}/users/profile/update/${user.id}`,
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateStudent(user: any) {
    return this.http.put(
      `${this.baseUrl}/users/students/${user.id}`,
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateUserGroups(userGroup: any) {
    console.log(userGroup);
    return this.http.post(
      `${this.baseUrl}/groups/addStudent`,
      userGroup,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  resetPassword(email: string) {
    return this.http.post(
      `${this.baseUrl}/users/reset`, {
        email : email
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
