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
        isActive: true,
        lastLogin: {
          id: 1,
          dateCreated: '09/01/2019 10:11'
        }
      },
      {
        id: 2,
        firstName: 'Marcelo',
        middleName: 'Del',
        lastName: 'Pilar',
        email: 'mhp@gmail.com',
        mobileNumber: '09123123123',
        role: 'Field Admin',
        isActive: false,
        lastLogin: {
          id: 2,
          dateCreated: '09/01/2019 10:11'
        }
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
}
