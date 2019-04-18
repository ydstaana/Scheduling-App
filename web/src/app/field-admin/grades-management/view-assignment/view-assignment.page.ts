import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UpdateGradePage } from '../update-grade/update-grade.page';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.page.html',
  styleUrls: ['./view-assignment.page.scss'],
})
export class ViewAssignmentPage implements OnInit {
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
      component: UpdateGradePage,
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
