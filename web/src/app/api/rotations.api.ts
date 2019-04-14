import { Api } from './api';
import { HttpClient } from '@angular/common/http';

export class RotationsApi extends Api {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(rotation: any) {
    return Promise.resolve(rotation);
  }

  list() {
    return Promise.resolve([
      {
        id: 1,
        schedule: {
          id: 1,
          startDate: '04/02/19',
          endDate: '04/03/19',
          isActive: true
        },
        field: {
          id: 1,
          name: 'Com-Med',
          address: 'Pateros',
          admin: {
              id: 1,
              firstName: 'Gregorio',
              middleName: 'Del',
              lastName: 'Pilar'
              // other fields
          },
          isActive: true
        },
        group: {
          id: 1,
          name: 'Group 1'
        },
        rotationType: 'Single',
        isActive: true
      },
      {
        id: 2,
        schedule: {
          id: 2,
          startDate: '04/04/19',
          endDate: '04/05/19',
          isActive: true
        },
        field: {
          id: 1,
          name: 'Derma',
          address: 'Pateros',
          admin: {
              id: 1,
              firstName: 'Gregorio',
              middleName: 'Del',
              lastName: 'Pilar'
              // other fields
          },
          isActive: true
        },
        group: {
          id: 2,
          name: 'Group 2'
        },
        rotationType: 'Single',
        isActive: true
      }
    ]);
  }

  update(rotation: any) {
    return Promise.resolve(rotation);
  }
}
