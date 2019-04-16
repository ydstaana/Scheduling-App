import { FieldGroupType, FieldType } from './../../../models/field.model';
import { FieldService } from './../../../services/field.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-groups-create',
  templateUrl: './field-groups-create.page.html',
  styleUrls: ['./field-groups-create.page.scss'],
})
export class FieldGroupsCreatePage implements OnInit {
  callInProgress = false;
  fieldGroupForm: FormGroup;
  fields = [];
  fieldsToDisplay = [];

  // rotation type variables
  fieldGroupType: string = FieldGroupType.STANDARD;
  FIELD_GROUP_TYPE_VALUES = FieldGroupType;
  FIELD_GROUP_TYPE_KEYS = Object.keys(FieldGroupType);

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

      this.fieldsToDisplay = this.fields.filter(f => {
        return this.fieldGroupType === FieldGroupType.STANDARD && f.fieldType === FieldType.STANDARD
          || this.fieldGroupType === FieldGroupType.MINOR && f.fieldType === FieldType.MINOR
          || this.fieldGroupType === FieldGroupType.ELECTIVE && f.fieldType === FieldType.ELECTIVE;
      });
    });
  }

  buildForm() {
    this.fieldGroupForm = this.formBuilder.group({
      fields: ['', [Validators.required]],
      fieldGroupType: ['', [Validators.required]]
    });
  }

  createFieldGroup() {
    console.log(this.fieldGroupForm.value);
    if (this.fieldGroupForm.valid) {
      this.fieldService.createFieldGroup(this.fieldGroupForm.value).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss();
        this.success('Successfully created a field group');
      }, error => {
        this.error('Unable to create field group. Please try again');
      });
    }
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  resolveFieldGroupType() {
    this.fieldsToDisplay = this.fields.filter(f => {
      return this.fieldGroupType === FieldGroupType.STANDARD && f.fieldType === FieldType.STANDARD
        || this.fieldGroupType === FieldGroupType.MINOR && f.fieldType === FieldType.MINOR
        || this.fieldGroupType === FieldGroupType.ELECTIVE && f.fieldType === FieldType.ELECTIVE;
    });

    console.log(this.fieldsToDisplay);
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
