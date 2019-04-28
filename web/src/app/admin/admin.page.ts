import { AdminProfilePage } from './admin-profile/admin-profile.page';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, Storage } from './../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private popoverCtrl: PopoverController
  ) {
    this.currentUser = JSON.parse(storageService.getItem(Storage.CURRENT_USER));
  }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeItem(Storage.CURRENT_USER);
    this.router.navigateByUrl('/login');
  }

  goTo(path: string) {
    this.router.navigateByUrl(`${path}`);
  }

  async viewProfile() {
    const viewModal = await this.popoverCtrl.create({
      component: AdminProfilePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
  }
}
