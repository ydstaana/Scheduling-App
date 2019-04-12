import { Api } from './api';
import { HttpClient } from '@angular/common/http';

export class UsersApi extends Api {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
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
