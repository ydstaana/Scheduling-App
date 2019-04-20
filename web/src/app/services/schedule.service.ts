import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedules.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  create(sched: any) {
    return Schedule.create(sched);
  }

  createSwitchScheduleRequest(request: any) {
    return Schedule.createSwitchScheduleRequest(request);
  }

  list() {
    return Schedule.list();
  }

  listSwitchRequestsByStudent(id: string) {
    return Schedule.listSwitchRequestsByStudent(id);
  }

  update(sched: any) {
    return Schedule.update(sched);
  }
}
