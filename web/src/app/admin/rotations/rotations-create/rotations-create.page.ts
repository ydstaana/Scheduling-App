import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldService } from 'src/app/services/field.service';
import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { RotationService } from 'src/app/services/rotation.service';
import { RotationType } from 'src/app/models/rotation.model';

@Component({
  selector: 'app-rotations-create',
  templateUrl: './rotations-create.page.html',
  styleUrls: ['./rotations-create.page.scss'],
})
export class RotationsCreatePage implements OnInit {
  schedules = [];
  fields = [];
  fieldGroups = [];
  fieldGroupsDisplay = [];
  groups = [];
  rotationForm: FormGroup;

  // rotation type variables
  rotationType: string = RotationType.Single;
  ROTATION_TYPE_VALUES = RotationType;
  ROTATION_TYPE_KEYS = Object.keys(RotationType);

  constructor(
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private fieldService: FieldService,
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private rotationService: RotationService
  ) { }

  ngOnInit() {
    this.scheduleService.list().then(data => {
      this.schedules = data;
    });

    this.fieldService.list().then(data => {
      this.fields = data;
    });

    this.fieldService.listFieldGroups().then(data => {
      this.fieldGroups = data;
    });

    this.userService.listUserGroups().then(data => {
      this.groups = data;
    });

    this.buildForm();
  }

  buildForm() {
    this.rotationForm = this.formBuilder.group({
      scheduleId: ['', [Validators.required]],
      fieldId: ['', [Validators.required]],
      fieldGroupId: ['', [Validators.required]],
      groupId: ['', [Validators.required]],
      rotationType: ['', [Validators.required]]
    });
  }

  createFieldGroup() {
    console.log(this.rotationForm.value);
    if (this.rotationForm.valid) {
      this.rotationService.create(this.rotationForm.value).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss();
        this.success('Successfully created a rotation');
      }, error => {
        this.error('Unable to create rotation. Please try again');
      });
    }
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  resolveRotationType() {
    const fieldId = this.rotationForm.get('fieldId');
    const fieldGroupId = this.rotationForm.get('fieldGroupId');
    this.fieldGroupsDisplay = this.fieldGroups.filter(fg => {
      return fg.rotationType === this.rotationType;
    });

    if (this.rotationType === RotationType.Single) {
      fieldId.setValue('');
      fieldGroupId.setValue('dummy');
    } else {
      fieldId.setValue('dummy');
      fieldGroupId.setValue('');
    }
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
