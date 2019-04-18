import { StorageService, Storage } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { RotationService } from 'src/app/services/rotation.service';
import { RotationType } from 'src/app/models/rotation.model';

@Component({
  selector: 'app-student-rotations',
  templateUrl: './student-rotations.page.html',
  styleUrls: ['./student-rotations.page.scss'],
})
export class StudentRotationsPage implements OnInit {
  assignments = [];

  constructor(
    private rotationService: RotationService,
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listRotationsByStudent();
  }

  getFieldName(rotation: any) {
    return rotation.rotationType === RotationType.Single ? rotation.field.name : rotation.fieldGroup.name;
  }

  listRotationsByStudent() {
    const currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
    this.rotationService.listRotationsByStudent(
      currentUser._id
    ).then((data: any) => {
      this.assignments = data;
      console.log(this.assignments);
    });
  }

  viewAssignment(assignment) {
    alert('Coming soon!');
  }
}
