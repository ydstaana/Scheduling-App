import { Api } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class SchedulesApi extends Api {
  constructor(
    private http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(schedule: any) {
    return this.http.post(
      `${this.baseUrl}/schedules`,
      {
        ...schedule,
        isActive: true
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  list() {
    return this.http.get(`${this.baseUrl}/schedules`).toPromise();
  }

  update(schedules: any) {
    return this.http.put(
      `${this.baseUrl}/schedules/${schedules._id}`,
      schedules,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
