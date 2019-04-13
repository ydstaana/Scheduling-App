import { FieldsUpdatePage } from './../fields-update/fields-update.page';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fields-view',
  templateUrl: './fields-view.page.html',
  styleUrls: ['./fields-view.page.scss'],
})
export class FieldsViewPage implements OnInit {
  field: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  async updateField() {
    const viewModal = await this.popoverCtrl.create({
      component: FieldsUpdatePage,
      componentProps: {
        field: this.field
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then((res: any) => {
      console.log(res);
      if (res.data) {
        this.field = res.data;
      }
    });

    return await viewModal.present();
  }
}
