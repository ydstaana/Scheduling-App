import { AccountsCreatePage } from './accounts-create/accounts-create.page';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  users = [];

  constructor(
    private userService: UserService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.userService.listUsers().then(data => {
      this.users = data;
    });
  }

  async createUser() {
    const viewModal = await this.popoverCtrl.create({
      component: AccountsCreatePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
  }
}
