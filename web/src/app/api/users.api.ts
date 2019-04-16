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
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  list() {
    return this.http.get(`${this.baseUrl}/users`).toPromise();
  }

  listUserGroups() {
    return this.http.get(`${this.baseUrl}/groups`).toPromise();
    // return Promise.resolve([
    //   {
    //     id: 1,
    //     name: 'Unassigned',
    //     users: [
    //       {
    //         id: 1,
    //         studentNumber: '12312312',
    //         firstName: 'Marcelo',
    //         middleName: 'Del',
    //         lastName: 'Pilar',
    //         // include other fields
    //       },
    //       {
    //         id: 2,
    //         studentNumber: '3333333',
    //         firstName: 'Pinoy',
    //         middleName: 'Del',
    //         lastName: 'Pilar',
    //         // include other fields
    //       }
    //     ]
    //   },
    //   {
    //     id: 2,
    //     name: 'Group 1',
    //     users: [
    //       {
    //         id: 3,
    //         studentNumber: '222222',
    //         firstName: 'China',
    //         middleName: 'Del',
    //         lastName: 'Pilar',
    //         // include other fields
    //       },
    //       {
    //         id: 4,
    //         studentNumber: '44444444',
    //         firstName: 'America',
    //         middleName: 'Del',
    //         lastName: 'Pilar',
    //         // include other fields
    //       }
    //     ]
    //   },
    //   { id: 3, name: 'Group 2', users: []},
    //   { id: 4, name: 'Group 3', users: []},
    //   { id: 5, name: 'Group 4', users: []},
    //   { id: 6, name: 'Group 5', users: []},
    //   { id: 7, name: 'Group 6', users: []},
    //   { id: 8, name: 'Group 7', users: []},
    //   { id: 9, name: 'Group 8', users: []},
    //   { id: 10, name: 'Group 9', users: []},
    //   { id: 11, name: 'Group 10', users: []},
    //   { id: 12, name: 'Group 11', users: []},
    //   { id: 13, name: 'Group 12', users: []}
    // ]);
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
    console.log(userGroup);
    return Promise.resolve([
      {
        id: 1,
        name: 'Unassigned',
        users: [
          {
            id: 1,
            studentNumber: '12312312',
            firstName: 'Marcelo',
            middleName: 'Del',
            lastName: 'Pilar',
            // include other fields
          },
          {
            id: 2,
            studentNumber: '3333333',
            firstName: 'Pinoy',
            middleName: 'Del',
            lastName: 'Pilar',
            // include other fields
          }
        ]
      },
      {
        id: 2,
        name: 'Group 1',
        users: [
          {
            id: 3,
            studentNumber: '222222',
            firstName: 'China',
            middleName: 'Del',
            lastName: 'Pilar',
            // include other fields
          },
          {
            id: 4,
            studentNumber: '44444444',
            firstName: 'America',
            middleName: 'Del',
            lastName: 'Pilar',
            // include other fields
          }
        ]
      },
      { id: 3, name: 'Group 2', users: []},
      { id: 4, name: 'Group 3', users: []},
      { id: 5, name: 'Group 4', users: []},
      { id: 6, name: 'Group 5', users: []},
      { id: 7, name: 'Group 6', users: []},
      { id: 8, name: 'Group 7', users: []},
      { id: 9, name: 'Group 8', users: []},
      { id: 10, name: 'Group 9', users: []},
      { id: 11, name: 'Group 10', users: []},
      { id: 12, name: 'Group 11', users: []},
      { id: 13, name: 'Group 12', users: []}
    ]);
  }
}
