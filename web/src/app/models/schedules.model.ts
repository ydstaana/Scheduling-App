import { Model } from './model';

export class Schedule extends Model {
    static create(schedule: any) {
        return this.api().schedules().create(schedule);
    }

    static createSwitchScheduleRequest(request: any) {
        return this.api().schedules().createSwitchScheduleRequest(request);
    }

    static list() {
        return this.api().schedules().list();
    }

    static listSwitchRequestsByStudent(id: string) {
        return this.api().schedules().listSwitchRequestsByStudent(id);
    }

    static update(schedule: any) {
        return this.api().schedules().update(schedule);
    }
}
