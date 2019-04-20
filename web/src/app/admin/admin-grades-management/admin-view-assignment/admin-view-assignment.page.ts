import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AdminUpdateGradePage } from '../admin-update-grade/admin-update-grade.page';

@Component({
  selector: 'app-admin-view-assignment',
  templateUrl: './admin-view-assignment.page.html',
  styleUrls: ['./admin-view-assignment.page.scss'],
})
export class AdminViewAssignmentPage implements OnInit {
  assignment: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  async updateGrade() {
    const viewModal = await this.popoverCtrl.create({
      component: AdminUpdateGradePage,
      componentProps: {
        assignment: this.assignment
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then((res: any) => {
      if (res.data) {
        this.assignment = res.data;
      }
    });

    return await viewModal.present();
  }
}
