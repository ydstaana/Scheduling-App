import { PopoverController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RotationService } from 'src/app/services/rotation.service';
import { RotationType } from 'src/app/models/rotation.model';

@Component({
  selector: 'app-rotations-update',
  templateUrl: './rotations-update.page.html',
  styleUrls: ['./rotations-update.page.scss'],
})
export class RotationsUpdatePage implements OnInit {
  rotation: any;
  callInProgress = false;
  isActive = true;

  constructor(
    private rotationService: RotationService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.isActive = this.rotation.isActive;
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

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

  updateRotation() {
    this.callInProgress = true;
    this.rotationService.update(this.rotation._id, { isActive: this.isActive }).then(data => {
      this.callInProgress = false;
      this.success('Successfully updated rotation.');
    }, error => {
      this.error('Unable to update rotation. Please try again');
      this.callInProgress = false;
    });
  }

  async success(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 5000,
      position: 'top',
      cssClass: 'toast-success'
    });
    toast.present();
  }

  async error(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 5000,
      position: 'top',
      cssClass: 'toast-danger',
    });
    toast.present();
  }
}
