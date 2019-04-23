import { Model } from './model';

export class Assignment extends Model {
  static listCustom() {
    return this.api().assignments().listCustom();
  }

  static listByFieldAdmin(id: string) {
    return this.api().assignments().listByFieldAdmin(id);
  }

  static listByStudent(id: string) {
    return this.api().assignments().listByStudent(id);
  }

  static listByUMA(id: string) {
    return this.api().assignments().listByUMA(id);
  }

  static listElectivesByStudent(id: string) {
    return this.api().assignments().listElectivesByStudent(id);
  }

  static listElectiveRequests() {
    return this.api().assignments().listElectiveRequests();
  }

  static listElectiveRequestsByStudent(id: string) {
    return this.api().assignments().listElectiveRequestsByStudent(id);
  }

  static update(assignment: any) {
    return this.api().assignments().update(assignment);
  }

  static switchAssignments(request: any) {
    return this.api().assignments().switchAssignments(request);
  }
}
