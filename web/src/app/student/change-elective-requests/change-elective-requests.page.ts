import { PopoverController } from '@ionic/angular';
import { StorageService, Storage } from 'src/app/services/storage.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { Component, OnInit } from '@angular/core';
import { CreateChangeElectiveRequestPage } from './create-change-elective-request/create-change-elective-request.page';

@Component({
  selector: 'app-change-elective-requests',
  templateUrl: './change-elective-requests.page.html',
  styleUrls: ['./change-elective-requests.page.scss'],
})
export class ChangeElectiveRequestsPage implements OnInit {
  currentUser: any;
  requests = [];

  constructor(
    private assignmentService: AssignmentService,
    private storageService: StorageService,
    private popoverCtrl: PopoverController
  ) {
    this.currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
  }

  ngOnInit() {
    this.listElectiveRequestsByStudent();
  }

  ionViewWillEnter() {
    this.listElectiveRequestsByStudent();
  }

  listElectiveRequestsByStudent() {
    this.assignmentService.listElectiveRequestsByStudent(this.currentUser._id).then((data: any) => {
      this.requests = data;
    });
  }

  async createRequest() {
    const viewModal = await this.popoverCtrl.create({
      component: CreateChangeElectiveRequestPage,
      componentProps: {
        currentUser: this.currentUser
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then(data => {
      this.listElectiveRequestsByStudent();
    });

    return await viewModal.present();
  }
}
