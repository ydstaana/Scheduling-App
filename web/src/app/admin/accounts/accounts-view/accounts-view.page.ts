import { AccountsViewAssignmentPage } from './../accounts-view-assignment/accounts-view-assignment.page';
import { AssignmentService } from 'src/app/services/assignment.service';
import { AccountsUpdatePage } from './../accounts-update/accounts-update.page';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserType } from 'src/app/models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.page.html',
  styleUrls: ['./accounts-view.page.scss'],
})
export class AccountsViewPage implements OnInit {
  user: any;
  currentTab = 'PERSONAL_INFORMATION';
  UserType = UserType;
  assignments = [];

  constructor(
    private popoverCtrl: PopoverController,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    if (this.user.userType === UserType.STUDENT) {
      this.assignmentService.listByStudent(this.user._id).then((data: any) => {
        this.assignments = data
          .filter(d => d.isActive)
          .sort((a, b) => {
            return moment(a.rotation.schedule.startDate).isAfter(moment(b.rotation.schedule.startDate)) ? 1 : -1;
          });
      });
    }
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  toggleView(tab) {
    this.currentTab = tab;
  }

  async viewAssignment(assignment) {
    const viewModal = await this.popoverCtrl.create({
      component: AccountsViewAssignmentPage,
      componentProps: {
        assignment: assignment
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
  }

  async updateUser() {
    const viewModal = await this.popoverCtrl.create({
      component: AccountsUpdatePage,
      componentProps: {
        user: this.user
      },
      cssClass: 'custom-popover',
      backdropDismiss: false
    });

    viewModal.onDidDismiss().then((res: any) => {
      console.log(res);
      if (res.data) {
        this.user = res.data;
      }
    });

    return await viewModal.present();
  }
}
