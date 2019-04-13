import { Api } from './api';
import { HttpClient } from '@angular/common/http';

export class SchedulesApi extends Api {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(schedule: any) {
    return Promise.resolve(schedule);
  }

  list() {
    return Promise.resolve([
      {
        id: 1,
        startDate: '04/02/19',
        endDate: '04/03/19',
        isActive: true
      },
      {
        id: 2,
        startDate: '04/04/19',
        endDate: '04/05/19',
        isActive: true
      },
    ]);
  }

  update(schedules: any) {
    return Promise.resolve(schedules);
  }
}
