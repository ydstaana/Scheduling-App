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
  unassignedStudents = [];
  callInProgress = false;

  constructor(
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.listUserGroups();
  }

  listUserGroups() {
    // set current group to display = null
    this.currentGroup = 'Unassigned';

    this.currentStudents = [];
    this.userService.listUserGroups().then((data: any) => {
      this.groups = data.map(group => {
        return {
          ...group,
          order: +group.name.split(' ')[1]
        };
      })
      .sort((a, b) => ((a.order === b.order) ? 0 : ((a.order > b.order) ? 1 : -1)) );

      // get unassigned students
      this.userService.listUnassignedStudents().then((res: any) => {
        this.unassignedStudents = res;

        // if (res) {
        //   this.unassignedStudents.forEach(student => {
        //     this.currentStudents.push({
        //       studentId: student._id,
        //       groupId: this.groups[0]._id
        //     });
        //   });
        // }
      }, error => {
        console.log(error);
      });
    });
  }

  resolveGroup() {
    this.currentStudents = [];
    // if (this.currentGroup === 'Unassigned') {
    //   this.currentStudents = [];
    //   this.unassignedStudents.forEach(student => {
    //     this.currentStudents.push({
    //       studentId: student._id,
    //       groupId: this.groups[0]._id
    //     });
    //   });
    // } else if (this.currentGroup.students) {
    //   this.currentStudents = [];
    //   this.currentGroup.students.forEach(student => {
    //     this.currentStudents.push({
    //       studentId: student._id,
    //       groupId: this.currentGroup._id
    //     });
    //   });
    // }
  }

  setGroup(student, event) {
    const selectedGroup = event.detail.value;
    const index = this.currentStudents.findIndex(i => {
      return i.studentId === student._id;
    });

    // check if selected unassigned, remove from current list of selected students
    if (selectedGroup === 'Unassigned') {
      if (index > -1) {
        this.currentStudents = this.currentStudents.filter(stud => stud.studentId !== student._id);
      }
    } else if (index > -1) {
      // remove then add again if user is already on edit list
      this.currentStudents = [
        ...this.currentStudents.filter(stud => stud.studentId !== student._id),
        {
          studentId: student._id,
          groupId: selectedGroup._id
        }
      ];
    } else {
      // add student directly to edit student list
      this.currentStudents.push({
        studentId: student._id,
        groupId: selectedGroup._id
      });
    }
  }

  updateGroups() {
    this.callInProgress = true;
    this.userService.updateUserGroups(this.currentStudents).then(data => {
      this.callInProgress = false;
      this.listUserGroups();

      this.success('Successfully updated group assigments.');
    }, error => {
      this.callInProgress = false;
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
