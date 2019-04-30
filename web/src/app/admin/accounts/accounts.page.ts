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
  filteredUsers = [];
  UserType = UserType;
  p: any;

  // user type variables
  userType: string = UserType.STUDENT;
  USER_TYPE_VALUES = UserType;
  USER_TYPE_KEYS = Object.keys(UserType);

  constructor(
    private userService: UserService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  ionViewWillEnter() {
    this.listUsers();
  }

  filterByType() {
    this.filteredUsers = this.users.filter(u => u.userType === this.userType);
  }

  listUsers() {
    this.userService.listUsers().then((data: any) => {
      this.users = data
        .sort((a, b) => {
          return a.firstName > b.firstName ? 1 : -1;
        });

      this.filterByType();
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
