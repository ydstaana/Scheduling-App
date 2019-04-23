import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  listCustom() {
    return Assignment.listCustom();
  }

  listByFieldAdmin(id: string) {
    return Assignment.listByFieldAdmin(id);
  }

  listByStudent(id: string) {
    return Assignment.listByStudent(id);
  }

  listByUMA(id: string) {
    return Assignment.listByUMA(id);
  }

  listElectivesByStudent(id: string) {
    return Assignment.listElectivesByStudent(id);
  }

  listElectiveRequests() {
    return Assignment.listElectiveRequests();
  }

  listElectiveRequestsByStudent(id: string) {
    return Assignment.listElectiveRequestsByStudent(id);
  }

  update(assignment: any) {
    return Assignment.update(assignment);
  }

  switchAssignments(request: any) {
    return Assignment.switchAssignments(request);
  }
}
