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
        name: 'Juan Dela Cruz',
        email: 'jdc@gmail.com',
        mobileNumber: '09123123123',
        role: 'UMA',
        isActive: true,
        lastLogin: {
          id: 1,
          dateCreated: '09/01/2019 10:11'
        }
      },
      {
        id: 2,
        name: 'Marcelo Del Pilar',
        email: 'mhp@gmail.com',
        mobileNumber: '09123123123',
        role: 'UMA',
        isActive: true,
        lastLogin: {
          id: 2,
          dateCreated: '09/01/2019 10:11'
        }
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
}
