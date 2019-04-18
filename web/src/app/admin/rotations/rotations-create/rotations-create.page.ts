import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldService } from 'src/app/services/field.service';
import { ScheduleService } from './../../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { RotationService } from 'src/app/services/rotation.service';
import { RotationType } from 'src/app/models/rotation.model';
import { FieldGroupType } from 'src/app/models/field.model';

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
    this.scheduleService.list().then((data: any) => {
      this.schedules = data.filter(d => d.isActive);
    });

    this.fieldService.list().then((data: any) => {
      this.fields = data.filter(d => d.isActive);
    });

    this.fieldService.listFieldGroups().then((data: any) => {
      this.fieldGroups = data.filter(d => d.isActive);
    });

    this.userService.listUserGroups().then((data: any) => {
      this.groups = data.map(group => {
        return {
          ...group,
          order: +group.name.split(' ')[1]
        };
      })
      .sort((a, b) => ((a.order === b.order) ? 0 : ((a.order > b.order) ? 1 : -1)) );
    });

    this.buildForm();
  }

  buildForm() {
    this.rotationForm = this.formBuilder.group({
      schedule: ['', [Validators.required]],
      field: ['dummy', [Validators.required]],
      fieldGroup: ['dummy', [Validators.required]],
      group: ['', [Validators.required]],
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
    const fieldId = this.rotationForm.get('field');
    const fieldGroupId = this.rotationForm.get('fieldGroup');
    this.fieldGroupsDisplay = this.fieldGroups.filter(fg => {
      // return fg.rotationType === this.rotationType;
      return this.rotationType === RotationType.Multiple && fg.fieldGroupType === FieldGroupType.MINOR ||
        this.rotationType === RotationType.Special && fg.fieldGroupType === FieldGroupType.ELECTIVE;
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
