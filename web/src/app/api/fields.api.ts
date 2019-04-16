import { Api } from './api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class FieldsApi extends Api {
  constructor(
    private http: HttpClient,
    baseUrl: string
  ) {
    super(baseUrl);
  }

  create(field: any) {
    return this.http.post(
      `${this.baseUrl}/fields`,
      {
        ...field,
        isActive: true
      },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  createGroup(field: any) {
    console.log(field);
    return Promise.resolve(field);
  }

  list() {
    return this.http.get(`${this.baseUrl}/fields`).toPromise();
  }

  listFieldGroups() {
    return this.http.get(`${this.baseUrl}/field-groups`).toPromise();
    // return Promise.resolve([
    //   {
    //     id: 1,
    //     name: 'Com-Med, Derma',
    //     fields: [
    //       {
    //         id: 1,
    //         name: 'Com-Med',
    //         address: 'Pateros',
    //         admin: {
    //             id: 1,
    //             firstName: 'Gregorio',
    //             middleName: 'Del',
    //             lastName: 'Pilar'
    //             // other fields
    //         },
    //         isActive: true
    //       },
    //       {
    //         id: 2,
    //         name: 'Derma',
    //         address: 'Pateros',
    //         admin: {
    //             id: 2,
    //             firstName: 'Marcel',
    //             middleName: 'Del',
    //             lastName: 'Pilar'
    //             // other fields
    //         },
    //         isActive: true
    //       }
    //     ],
    //     rotationType: 'Multiple',
    //     isActive: true
    //   },
    //   {
    //     id: 2,
    //     name: 'Radio Ewan, Derma',
    //     fields: [
    //       {
    //         id: 1,
    //         name: 'Radio Ewan',
    //         address: 'Pateros',
    //         admin: {
    //             id: 1,
    //             firstName: 'Gregorio',
    //             middleName: 'Del',
    //             lastName: 'Pilar'
    //             // other fields
    //         },
    //         isActive: true
    //       },
    //       {
    //         id: 2,
    //         name: 'Derma',
    //         address: 'Pateros',
    //         admin: {
    //             id: 2,
    //             firstName: 'Marcel',
    //             middleName: 'Del',
    //             lastName: 'Pilar'
    //             // other fields
    //         },
    //         isActive: true
    //       }
    //     ],
    //     rotationType: 'Elective',
    //     isActive: true
    //   }
    // ]);
  }

  listAdmins() {
    return this.http.get(`${this.baseUrl}/users/field-admins`).toPromise();
  }

  update(field: any) {
    // return Promise.resolve(field);
    return this.http.put(
      `${this.baseUrl}/fields/${field._id}`,
      field,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).toPromise();
  }

  updateGroup(group: any) {
    return Promise.resolve(group);
  }
}
