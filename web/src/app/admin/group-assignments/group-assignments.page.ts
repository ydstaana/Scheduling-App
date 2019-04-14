import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-group-assignments',
  templateUrl: './group-assignments.page.html',
  styleUrls: ['./group-assignments.page.scss'],
})
export class GroupAssignmentsPage implements OnInit {
  groups = [];
  currentGroup: any;
  currentUsers = [];

  constructor(
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.userService.listUserGroups().then(data => {
      this.groups = data;
      this.currentGroup = this.groups[0];

      if (this.currentGroup.users) {
        this.currentGroup.users.forEach(user => {
          this.currentUsers.push({
            userId: user.id,
            groupId: this.currentGroup.id
          });
        });
      }
    });
  }

  resolveGroup() {
    if (this.currentGroup.users) {
      this.currentUsers = [];
      this.currentGroup.users.forEach(user => {
        this.currentUsers.push({
          userId: user.id,
          groupId: this.currentGroup.id
        });
      });
      console.log(this.currentUsers);
    }
  }

  setGroup(user, event) {
    const selectedGroup = event.detail.value;
    const index = this.currentUsers.findIndex(i => {
      return i.userId === user.id;
    });
    this.currentUsers[index] = {
      userId: user.id,
      groupId: selectedGroup.id
    };
  }

  updateGroups() {
    console.log(this.currentUsers);
    this.userService.updateUserGroups(this.currentUsers).then(data => {
      this.groups = data;
      this.currentGroup = this.groups[0];

      this.currentUsers = [];
      if (this.currentGroup.users) {
        this.currentGroup.users.forEach(user => {
          this.currentUsers.push({
            userId: user.id,
            groupId: this.currentGroup.id
          });
        });
      }

      this.success('Successfully updated group assigments.');
    }, error => {
      this.error('Unable to update group assigments. Please try again.');
    });
  }

  async success(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 5000,
      position: 'top',
      cssClass: 'toast-success'
    });
    toast.present();
  }

  async error(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      duration: 5000,
      position: 'top',
      cssClass: 'toast-danger',
    });
    toast.present();
  }
}
