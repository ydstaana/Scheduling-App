import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FieldGroupsUpdatePage } from '../field-groups-update/field-groups-update.page';

@Component({
  selector: 'app-field-groups-view',
  templateUrl: './field-groups-view.page.html',
  styleUrls: ['./field-groups-view.page.scss'],
})
export class FieldGroupsViewPage implements OnInit {
  fieldGroup: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  async updateFieldGroup() {
    const viewModal = await this.popoverCtrl.create({
      component: FieldGroupsUpdatePage,
      componentProps: {
        fieldGroup: this.fieldGroup
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then((res: any) => {
      console.log(res);
      if (res.data) {
        this.fieldGroup = res.data;
      }
    });

    return await viewModal.present();
  }
}
