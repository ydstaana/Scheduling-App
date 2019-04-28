import { FieldAdminProfilePage } from './field-admin-profile/field-admin-profile.page';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, Storage } from '../services/storage.service';

@Component({
  selector: 'app-field-admin',
  templateUrl: './field-admin.page.html',
  styleUrls: ['./field-admin.page.scss'],
})
export class FieldAdminPage implements OnInit {
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

  async viewProfile() {
    const viewModal = await this.popoverCtrl.create({
      component: FieldAdminProfilePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
  }
}
