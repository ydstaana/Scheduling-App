import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedules.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  create(sched: any) {
    return Schedule.create(sched);
  }

  list() {
    return Schedule.list();
  }

  update(sched: any) {
    return Schedule.update(sched);
  }
}
