import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-view-assignment',
  templateUrl: './accounts-view-assignment.page.html',
  styleUrls: ['./accounts-view-assignment.page.scss'],
})
export class AccountsViewAssignmentPage implements OnInit {
  assignment: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }
}
