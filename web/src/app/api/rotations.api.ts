import { Api } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class RotationsApi extends Api {
  constructor(
    private http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(rotation: any) {
    console.log(rotation);
    return this.http.post(
      `${this.baseUrl}/rotations`,
      {
        ...rotation,
        isActive: true
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  list() {
    return this.http.get(`${this.baseUrl}/rotations`).toPromise();
  }

  listRotationsByStudent(id: string) {
    console.log(`>>>>>>URL: ${this.baseUrl}/assignments/students/${id}`);
    return this.http.get(`${this.baseUrl}/assignments/students/${id}`).toPromise();
  }

  update(rotation: any) {
    return Promise.resolve(rotation);
  }
}
