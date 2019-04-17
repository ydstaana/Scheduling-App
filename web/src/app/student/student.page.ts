import { StorageService, Storage } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { StudentProfilePage } from './student-profile/student-profile.page';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  logout() {
    this.storageService.removeItem(Storage.CURRENT_USER);
    this.router.navigateByUrl('/login');
  }

  async viewProfile() {
    const viewModal = await this.popoverCtrl.create({
      component: StudentProfilePage,
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
  }
}
