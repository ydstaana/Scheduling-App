import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-student-assignment',
  templateUrl: './view-student-assignment.page.html',
  styleUrls: ['./view-student-assignment.page.scss'],
})
export class ViewStudentAssignmentPage implements OnInit {
  assignment: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }
}
