import { PopoverController } from '@ionic/angular';
import { RotationService } from './../../services/rotation.service';
import { Component, OnInit } from '@angular/core';
import { RotationsCreatePage } from './rotations-create/rotations-create.page';
import { RotationType } from 'src/app/models/rotation.model';

@Component({
  selector: 'app-rotations',
  templateUrl: './rotations.page.html',
  styleUrls: ['./rotations.page.scss'],
})
export class RotationsPage implements OnInit {
  rotations = [];

  constructor(
    private rotationService: RotationService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listRotations();
  }

  listRotations() {
    this.rotationService.list().then((data: any) => {
      this.rotations = data;
      console.log(this.rotations);
    });
  }

  // async viewFieldGroup(fieldGroup) {
  //   const viewModal = await this.popoverCtrl.create({
  //     component: FieldGroupsViewPage,
  //     componentProps: {
  //       fieldGroup: fieldGroup
  //     },
  //     cssClass: 'custom-popover',
  //     backdropDismiss: false
  //   });

  //   viewModal.onDidDismiss().then(data => {
  //     this.listRotations();
  //   });

  //   return await viewModal.present();
  // }

  getFieldName(rotation: any) {
    return rotation.rotationType === RotationType.Single ? rotation.field.name : rotation.fieldGroup.name;
  }

  getAdminName(rotation: any) {
    let name = rotation.rotationType === RotationType.Single
      ? `${rotation.field.admin.firstName} ${rotation.field.admin.lastName}` : '';

    if (rotation.rotationType !== RotationType.Single) {
      rotation.fieldGroup.fields.map(field => {
        return `${field.admin.firstName} ${field.admin.lastName}`;
      })
      .sort()
      .filter(function(item, pos, ary) {
        return !pos || item !== ary[pos - 1];
      })
      .forEach(aName => {
        if (name !== '') {
          name += ',';
        }

        name += aName;
      });
    }

    return name;
  }

  async createRotation() {
    const viewModal = await this.popoverCtrl.create({
      component: RotationsCreatePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listRotations();
    });

    return await viewModal.present();
  }
}
