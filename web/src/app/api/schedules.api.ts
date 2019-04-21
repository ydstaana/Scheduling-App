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

  createSwitchScheduleRequest(request: any) {
    console.log(request);
    return this.http.post(
      `${this.baseUrl}/requests`,
      request,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  list() {
    return this.http.get(`${this.baseUrl}/schedules`).toPromise();
  }

  listSwitchRequests() {
    return this.http.get(`${this.baseUrl}/requests/switch`).toPromise();
  }

  listSwitchRequestsByStudent(id: string) {
    return this.http.get(`${this.baseUrl}/requests/switch/student/${id}`).toPromise();
  }

  update(schedules: any) {
    return this.http.put(
      `${this.baseUrl}/schedules/${schedules.id}`,
      schedules,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateRequest(id: string, req: any) {
    return this.http.put(
      `${this.baseUrl}/requests/${id}`,
      req,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }
}
