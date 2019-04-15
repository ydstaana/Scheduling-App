import { FieldService } from './../../../services/field.service';
import { ToastController, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RotationType } from 'src/app/models/rotation.model';

@Component({
  selector: 'app-field-groups-update',
  templateUrl: './field-groups-update.page.html',
  styleUrls: ['./field-groups-update.page.scss'],
})
export class FieldGroupsUpdatePage implements OnInit {
  fieldGroup: any;
  callInProgress = false;
  fieldGroupForm: FormGroup;
  fields = [];
  selectedFields = [];

  // rotation type variables
  rotationType: string = RotationType.Single;
  ROTATION_TYPE_VALUES = RotationType;
  ROTATION_TYPE_KEYS = Object.keys(RotationType);

  constructor(
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private fieldService: FieldService
  ) { }

  ngOnInit() {
    this.buildForm();

    this.fieldService.list().then((data: any) => {
      this.fields = data;
    });

    this.rotationType = this.fieldGroup.rotationType;

    this.selectedFields = this.fieldGroup.fields.map(f => f.id);
    console.log(this.selectedFields);
  }

  buildForm() {
    this.fieldGroupForm = this.formBuilder.group({
      fields: ['', [Validators.required]],
      rotationType: ['', [Validators.required]]
    });
  }

  updateFieldGroup() {
    const updatedField = {
      ...this.fieldGroup,
      ...this.fieldGroupForm.value
    };
    console.log(updatedField);
    if (this.fieldGroupForm.valid) {
      this.fieldService.updateGroup(updatedField).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss(updatedField);
        this.success('Successfully updated field group');
      }, error => {
        this.error('Unable to update field group. Please try again');
      });
    }
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
