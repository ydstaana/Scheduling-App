import { PopoverController } from '@ionic/angular';
import { RotationService } from './../../services/rotation.service';
import { Component, OnInit } from '@angular/core';
import { RotationsCreatePage } from './rotations-create/rotations-create.page';

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
