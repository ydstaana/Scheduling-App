import { AssignmentsApi } from './assignment.api';
import { SchedulesApi } from './schedules.api';
import { FieldsApi } from './fields.api';
import { UsersApi } from './users.api';
import { HttpClient } from '@angular/common/http';
import { RotationsApi } from './rotations.api';

export class ApiClient {
  private readonly usersApi: UsersApi;
  private readonly fieldsApi: FieldsApi;
  private readonly schedulesApi: SchedulesApi;
  private readonly rotationsApi: RotationsApi;
  private readonly assignmentsApi: AssignmentsApi;

  constructor(http: HttpClient, baseUrl: string) {
    this.usersApi = new UsersApi(http, baseUrl);
    this.fieldsApi = new FieldsApi(http, baseUrl);
    this.schedulesApi = new SchedulesApi(http, baseUrl);
    this.rotationsApi = new RotationsApi(http, baseUrl);
    this.assignmentsApi = new AssignmentsApi(http, baseUrl);
  }

  assignments(): AssignmentsApi {
    return this.assignmentsApi;
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

  rotations(): RotationsApi {
    return this.rotationsApi;
  }
}
