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
  currentStudents = [];

  constructor(
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.listUserGroups();
  }

  listUserGroups() {
    this.userService.listUserGroups().then((data: any) => {
      this.groups = data;
      console.log(this.groups);
      this.currentGroup = this.groups[0];

      if (this.currentGroup.students) {
        this.currentGroup.students.forEach(student => {
          this.currentStudents.push({
            studentId: student._id,
            groupId: this.currentGroup._id
          });
        });
      }
    });
  }

  resolveGroup() {
    if (this.currentGroup.users) {
      this.currentStudents = [];
      this.currentGroup.users.forEach(student => {
        this.currentStudents.push({
          userId: student._id,
          groupId: this.currentGroup._id
        });
      });
      console.log(this.currentStudents);
    }
  }

  setGroup(student, event) {
    const selectedGroup = event.detail.value;
    const index = this.currentStudents.findIndex(i => {
      return i.studentId === student.id;
    });
    this.currentStudents[index] = {
      studentId: student._id,
      groupId: selectedGroup._id
    };
  }

  updateGroups() {
    console.log(this.currentStudents);
    this.userService.updateUserGroups(this.currentStudents).then(data => {
      // this.groups = data;
      // this.currentGroup = this.groups[0];

      // this.currentStudents = [];
      // if (this.currentGroup.students) {
      //   this.currentGroup.users.forEach(student => {
      //     this.currentStudents.push({
      //       studentId: user.id,
      //       groupId: this.currentGroup.id
      //     });
      //   });
      // }
      this.listUserGroups();

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
