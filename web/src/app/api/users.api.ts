import { Api } from './api';
import { HttpClient } from '@angular/common/http';
import { UserType } from '../models/user.model';

export class UsersApi extends Api {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(user: any) {
    const u = {
      ...user,
      accountType: Object.keys(UserType).find(key => UserType[key] === user.accountType)
    };

    return Promise.resolve(u);
  }

  list() {
    return Promise.resolve([
      {
        id: 1,
        firstName: 'Gregorio',
        middleName: 'Del',
        lastName: 'Pilar',
        email: 'jdc@gmail.com',
        mobileNumber: '09123123123',
        role: 'UST Medicine Admin',
        isActive: true
      },
      {
        id: 2,
        firstName: 'Marcelo',
        middleName: 'Del',
        lastName: 'Pilar',
        email: 'mhp@gmail.com',
        mobileNumber: '09123123123',
        role: 'Field Admin',
        isActive: false
      },
      {
        id: 3,
        firstName: 'Shim',
        middleName: 'Del',
        lastName: 'Pilar',
        email: 'shp@gmail.com',
        mobileNumber: '09123123123',
        role: 'Student',
        isActive: true,
        lastLogin: {
          id: 3,
          dateCreated: '09/01/2019 10:11'
        },
        group: {
          id: 1,
          name: 'Group 1'
        },
        contactPersonNumber: '09123123123',
        contactPersonName: 'Tatay Niya'
      }
    ]);
  }

  listUserGroups() {
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

  login(username: string, password) {
    if (username === 'u' && password === 'p') {
      console.log(this.baseUrl);
      return Promise.resolve({
        id: '123',
        name: 'Patrick',
        permission: 'UMA'
      });
    } else {
      return Promise.reject();
    }
  }

  update(user: any) {
    return Promise.resolve(user);
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
