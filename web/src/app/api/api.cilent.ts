import { UsersApi } from './users.api';
import { HttpClient } from '@angular/common/http';

export class ApiClient {
  private readonly usersApi: UsersApi;

  constructor(http: HttpClient, baseUrl: string) {
    this.usersApi = new UsersApi(http, baseUrl);
  }

  users(): UsersApi {
    return this.usersApi;
  }
}
