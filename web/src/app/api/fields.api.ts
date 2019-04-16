import { Api } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class FieldsApi extends Api {
  constructor(
    private http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(field: any) {
    return this.http.post(
      `${this.baseUrl}/fields`,
      {
        ...field,
        isActive: true
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  createGroup(field: any) {
    return this.http.post(
      `${this.baseUrl}/field-groups`,
      {
        ...field,
        isActive: true
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  list() {
    return this.http.get(`${this.baseUrl}/fields`).toPromise();
  }

  listFieldGroups() {
    return this.http.get(`${this.baseUrl}/field-groups`).toPromise();
  }

  listAdmins() {
    return this.http.get(`${this.baseUrl}/users/field-admins`).toPromise();
  }

  update(field: any) {
    return this.http.put(
      `${this.baseUrl}/fields/${field._id}`,
      field,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateGroup(group: any) {
    return this.http.put(
      `${this.baseUrl}/field-groups/${group._id}`,
      group,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
