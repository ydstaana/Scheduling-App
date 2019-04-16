import { PopoverController } from '@ionic/angular';
import { FieldGroupsCreatePage } from './field-groups-create/field-groups-create.page';
import { Component, OnInit } from '@angular/core';
import { FieldGroupsViewPage } from './field-groups-view/field-groups-view.page';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-field-groups',
  templateUrl: './field-groups.page.html',
  styleUrls: ['./field-groups.page.scss'],
})
export class FieldGroupsPage implements OnInit {
  fieldGroups = [];

  constructor(
    private fieldService: FieldService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.listFieldGroups();
  }

  listFieldGroups() {
    this.fieldService.listFieldGroups().then((data: any) => {
      console.log(data);
      this.fieldGroups = data;
    });
  }

  async viewFieldGroup(fieldGroup) {
    const viewModal = await this.popoverCtrl.create({
      component: FieldGroupsViewPage,
      componentProps: {
        fieldGroup: fieldGroup
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listFieldGroups();
    });

    return await viewModal.present();
  }

  async createFieldGroup() {
    const viewModal = await this.popoverCtrl.create({
      component: FieldGroupsCreatePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listFieldGroups();
    });

    return await viewModal.present();
  }
}
