import { UserType } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { StorageService, Storage } from '../services/storage.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FAQPage implements OnInit {
  currentUser: any;
  UserType = UserType;

  constructor(
    storageService: StorageService,
    private popoverCtrl: PopoverController
  ) {
    this.currentUser = JSON.parse(storageService.getItem(Storage.CURRENT_USER));
  }

  ngOnInit() {
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }
}
