import { AccountsUpdatePage } from './../accounts-update/accounts-update.page';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserType } from 'src/app/models/user.model';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.page.html',
  styleUrls: ['./accounts-view.page.scss'],
})
export class AccountsViewPage implements OnInit {
  user: any;
  currentTab = 'PERSONAL_INFORMATION';
  UserType = UserType;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  toggleView(tab) {
    this.currentTab = tab;
  }

  async updateUser() {
    const viewModal = await this.popoverCtrl.create({
      component: AccountsUpdatePage,
      componentProps: {
        user: this.user
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then((res: any) => {
      console.log(res);
      if (res.data) {
        this.user = res.data;
      }
    });

    return await viewModal.present();
  }
}
