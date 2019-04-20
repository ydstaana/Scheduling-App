import { Model } from './model';

export class Assignment extends Model {
  static listByFieldAdmin(id: string) {
    return this.api().assignments().listByFieldAdmin(id);
  }

  static listByStudent(id: string) {
    return this.api().assignments().listByStudent(id);
  }

  static update(assignment: any) {
    return this.api().assignments().update(assignment);
  }

  static switchAssignments(request: any) {
    return this.api().assignments().switchAssignments(request);
  }
}
