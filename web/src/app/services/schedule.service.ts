import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedules.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  create(sched: any) {
    return Schedule.create(sched);
  }

  createChangeRequest(request: any) {
    return Schedule.createChangeRequest(request);
  }

  list() {
    return Schedule.list();
  }

  listSwitchRequests() {
    return Schedule.listSwitchRequests();
  }

  listSwitchRequestsByStudent(id: string) {
    return Schedule.listSwitchRequestsByStudent(id);
  }

  update(sched: any) {
    return Schedule.update(sched);
  }

  updateRequest(id: string, req: any) {
    return Schedule.updateRequest(id, req);
  }
}
