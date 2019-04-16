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
    this.currentStudents = [];
    this.userService.listUserGroups().then((data: any) => {
      this.groups = data.map(group => {
        return {
          ...group,
          order: group.name === 'Unassigned' ? 0 : +group.name.split(' ')[1]
        };
      })
      .sort((a, b) => ((a.order === b.order) ? 0 : ((a.order > b.order) ? 1 : -1)) );
      this.currentGroup = this.groups[0];

      if (this.currentGroup.students) {
        this.currentGroup.students.forEach(student => {
          this.currentStudents.push({
            studentId: student._id,
            groupId: this.currentGroup._id
          });
        });
      }

      console.log(this.groups);
    });
  }

  resolveGroup() {
    if (this.currentGroup.students) {
      this.currentStudents = [];
      this.currentGroup.students.forEach(student => {
        this.currentStudents.push({
          studentId: student._id,
          groupId: this.currentGroup._id
        });
      });
    }
  }

  setGroup(student, event) {
    const selectedGroup = event.detail.value;
    const index = this.currentStudents.findIndex(i => {
      return i.studentId === student._id;
    });

    if (index > -1) {
      this.currentStudents = [
        ...this.currentStudents.filter(stud => stud.studentId !== student._id),
        {
          studentId: student._id,
          groupId: selectedGroup._id
        }
      ];
    }

    console.log(this.currentStudents);
  }

  updateGroups() {
    console.log(this.currentStudents);
    this.userService.updateUserGroups(this.currentStudents).then(data => {
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
