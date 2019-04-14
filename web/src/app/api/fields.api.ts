import { Api } from './api';
import { HttpClient } from '@angular/common/http';

export class FieldsApi extends Api {
  constructor(
    http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(field: any) {
    return Promise.resolve(field);
  }

  createGroup(field: any) {
    return Promise.resolve(field);
  }

  list() {
    return Promise.resolve([
      {
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
      {
        id: 2,
        name: 'Derma',
        address: 'Pateros',
        admin: {
            id: 2,
            firstName: 'Marcel',
            middleName: 'Del',
            lastName: 'Pilar'
            // other fields
        },
        isActive: true
      }
    ]);
  }

  listFieldGroups() {
    return Promise.resolve([
      {
        id: 1,
        name: 'Com-Med, Derma',
        fields: [
          {
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
          {
            id: 2,
            name: 'Derma',
            address: 'Pateros',
            admin: {
                id: 2,
                firstName: 'Marcel',
                middleName: 'Del',
                lastName: 'Pilar'
                // other fields
            },
            isActive: true
          }
        ],
        isActive: true
      }
    ]);
  }

  listAdmins() {
    return Promise.resolve([
      {
          id: 1,
          firstName: 'Gregorio',
          middleName: 'Del',
          lastName: 'Pilar'
          // other fields
      },
      {
          id: 2,
          firstName: 'Marcel',
          middleName: 'Del',
          lastName: 'Pilar'
          // other fields
      }
    ]);
  }

  update(field: any) {
    return Promise.resolve(field);
  }

  updateGroup(group: any) {
    return Promise.resolve(group);
  }
}
