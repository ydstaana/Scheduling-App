import { Model } from './model';

export enum RotationType {
  Single = 'Single',
  Multiple = 'Multiple',
  Elective = 'Elective'
}

export class Rotation extends Model {
  static create(rotation: any) {
    return this.api().rotations().create(rotation);
  }

  static list() {
    return this.api().rotations().list();
  }

  static update(rotation: any) {
    return this.api().rotations().update(rotation);
  }
}
