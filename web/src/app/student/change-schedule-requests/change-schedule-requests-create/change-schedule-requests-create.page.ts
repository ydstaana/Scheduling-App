import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RotationService } from 'src/app/services/rotation.service';

@Component({
  selector: 'app-change-schedule-requests-create',
  templateUrl: './change-schedule-requests-create.page.html',
  styleUrls: ['./change-schedule-requests-create.page.scss'],
})
export class ChangeScheduleRequestsCreatePage implements OnInit {
  rotations = [];
  assignments: any;
  selectedAssignment: any;
  selectedRotation: any;
  requestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rotationService: RotationService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.listRotations();
  }

  buildForm() {
    this.requestForm = this.formBuilder.group({
      rotation: ['', [Validators.required]],
      assignment: ['', [Validators.required]]
    });
  }

  listRotations() {
    this.rotationService.list().then((data: any) => {
      this.rotations = data;
    });
  }

  dismiss() {
    this.popoverCtrl.dismiss();
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
