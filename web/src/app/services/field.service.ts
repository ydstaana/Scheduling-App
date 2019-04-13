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

  list() {
    return Field.list();
  }

  listAdmins() {
    return Field.listAdmins();
  }

  update(field: any) {
    return Field.update(field);
  }
}
