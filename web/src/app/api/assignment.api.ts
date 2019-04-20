import { Api } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class AssignmentsApi extends Api {
  constructor(
    private http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  listByFieldAdmin(id: string) {
    return this.http.get(`${this.baseUrl}/assignments/field-admin/${id}`).toPromise();
  }

  listByStudent(id: string) {
    return this.http.get(`${this.baseUrl}/assignments/students/${id}`).toPromise();
  }

  update(assignment: any) {
    return this.http.put(
      `${this.baseUrl}/assignments/${assignment.id}`,
      assignment,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  switchAssignments(request: any) {
    console.log(request);
    return this.http.post(
      `${this.baseUrl}/assignments/switch`,
      request,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
