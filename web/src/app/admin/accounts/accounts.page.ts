import { AccountsViewPage } from './accounts-view/accounts-view.page';
import { AccountsCreatePage } from './accounts-create/accounts-create.page';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { UserType } from 'src/app/models/user.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  users = [];
  UserType = UserType;
  p: any;

  constructor(
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listUsers();
  }

  listUsers() {
    this.userService.listUsers().then((data: any) => {
      this.users = data
        .sort((a, b) => {
          return a.firstName > b.firstName ? 1 : -1;
        });
    });
  }

  async viewUser(user) {
    const viewModal = await this.popoverCtrl.create({
      component: AccountsViewPage,
      componentProps: {
        user: user
      },
      cssClass: 'fixed-custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listUsers();
    });

    return await viewModal.present();
  }

  async createUser() {
    const viewModal = await this.popoverCtrl.create({
      component: AccountsCreatePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listUsers();
    });

    return await viewModal.present();
  }
}
