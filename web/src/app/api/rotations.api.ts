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

  update(id: string, rotation: any) {
    console.log(rotation);
    return this.http.put(
      `${this.baseUrl}/rotations/${id}`,
      rotation,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
