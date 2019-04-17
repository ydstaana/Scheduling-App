import { Injectable } from '@angular/core';
import { Rotation } from '../models/rotation.model';

@Injectable({
  providedIn: 'root'
})
export class RotationService {
  create(rotation: any) {
    return Rotation.create(rotation);
  }

  list() {
    return Rotation.list();
  }

  listRotationsByStudent(id: string) {
    return Rotation.listRotationsByStudent(id);
  }

  update(rotation: any) {
    return Rotation.update(rotation);
  }
}
