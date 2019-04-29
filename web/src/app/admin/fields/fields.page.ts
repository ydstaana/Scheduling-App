import { FieldsViewPage } from './fields-view/fields-view.page';
import { FieldService } from './../../services/field.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FieldsCreatePage } from './fields-create/fields-create.page';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.page.html',
  styleUrls: ['./fields.page.scss'],
})
export class FieldsPage implements OnInit {
  fields = [];

  constructor(
    private fieldService: FieldService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listFields();
  }

  listFields() {
    this.fieldService.list().then((data: any) => {
      this.fields = data.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });
    });
  }

  async viewField(field) {
    const viewModal = await this.popoverCtrl.create({
      component: FieldsViewPage,
      componentProps: {
        field: field
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listFields();
    });

    return await viewModal.present();
  }

  async createField() {
    const viewModal = await this.popoverCtrl.create({
      component: FieldsCreatePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listFields();
    });

    return await viewModal.present();
  }
}
