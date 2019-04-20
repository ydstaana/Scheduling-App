import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-schedule-requests-view',
  templateUrl: './change-schedule-requests-view.page.html',
  styleUrls: ['./change-schedule-requests-view.page.scss'],
})
export class ChangeScheduleRequestsViewPage implements OnInit {
  request: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }
}
