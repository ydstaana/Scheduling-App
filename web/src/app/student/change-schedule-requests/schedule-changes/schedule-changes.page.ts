import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-changes',
  templateUrl: './schedule-changes.page.html',
  styleUrls: ['./schedule-changes.page.scss'],
})
export class ScheduleChangesPage implements OnInit {
  assignments: any;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  dismiss() {
    this.popoverCtrl.dismiss();
  }
}
