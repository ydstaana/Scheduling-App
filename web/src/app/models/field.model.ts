import { Model } from './model';

export class Field extends Model {
    static create(field: any) {
        return this.api().fields().create(field);
    }

    static list() {
        return this.api().fields().list();
    }

    static listAdmins() {
        return this.api().fields().listAdmins();
    }

    static update(field: any) {
        return this.api().fields().update(field);
    }
}
