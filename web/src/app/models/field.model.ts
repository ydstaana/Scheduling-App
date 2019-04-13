import { Model } from './model';

export class Field extends Model {
    static create(field: any) {
        return this.api().fields().create(field);
    }

    static createGroup(group: any) {
        return this.api().fields().createGroup(group);
    }

    static list() {
        return this.api().fields().list();
    }

    static listFieldGroups() {
        return this.api().fields().listFieldGroups();
    }

    static listAdmins() {
        return this.api().fields().listAdmins();
    }

    static update(field: any) {
        return this.api().fields().update(field);
    }

    static updateGroup(group: any) {
        return this.api().fields().updateGroup(group);
    }
}
