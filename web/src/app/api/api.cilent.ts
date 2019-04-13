import { SchedulesApi } from './schedules.api';
import { FieldsApi } from './fields.api';
import { UsersApi } from './users.api';
import { HttpClient } from '@angular/common/http';

export class ApiClient {
  private readonly usersApi: UsersApi;
  private readonly fieldsApi: FieldsApi;
  private readonly schedulesApi: SchedulesApi;

  constructor(http: HttpClient, baseUrl: string) {
    this.usersApi = new UsersApi(http, baseUrl);
    this.fieldsApi = new FieldsApi(http, baseUrl);
    this.schedulesApi = new SchedulesApi(http, baseUrl);
  }

  users(): UsersApi {
    return this.usersApi;
  }

  fields(): FieldsApi {
    return this.fieldsApi;
  }

  schedules(): SchedulesApi {
    return this.schedulesApi;
  }
}
