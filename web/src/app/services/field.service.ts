import { Field } from './../models/field.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor() { }

  create(field: any) {
    return Field.create(field);
  }

  createFieldGroup(group) {
    return Field.createGroup(group);
  }

  list() {
    return Field.list();
  }

  listFieldGroups() {
    return Field.listFieldGroups();
  }

  listAdmins() {
    return Field.listAdmins();
  }

  update(field: any) {
    return Field.update(field);
  }

  updateGroup(group) {
    return Field.updateGroup(group);
  }
}
