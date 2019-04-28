import { FieldGroupType, FieldType } from './../../../models/field.model';
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

    this.fieldGroupType = this.fieldGroup.fieldGroupType;

    this.fieldService.list().then((data: any) => {
      this.fields = data.filter(d => d.isActive);

      this.fieldsToDisplay = this.fields.filter(f => {
        return this.fieldGroupType === FieldGroupType.STANDARD && f.fieldType === FieldType.STANDARD
          || this.fieldGroupType === FieldGroupType.MINOR && f.fieldType === FieldType.MINOR
          || this.fieldGroupType === FieldGroupType.ELECTIVE && f.fieldType === FieldType.ELECTIVE;
      });
    });

    this.selectedFields = this.fieldGroup.fields.map(f => f._id);
  }

  buildForm() {
    this.fieldGroupForm = this.formBuilder.group({
      fields: ['', [Validators.required]],
      fieldGroupType: ['', [Validators.required]],
      isActive: [this.fieldGroup.isActive, []]
    });
  }

  updateFieldGroup() {
    let fieldName = '';
    this.fields.filter(f => {
      return (this.fieldGroupForm.get('fields').value as string[]).includes(f._id);
    }).forEach(f => {
      if (fieldName !== '') {
        fieldName += ', ';
      }
      fieldName += f.name;
    });
    const updatedField = {
      ...this.fieldGroup,
      ...this.fieldGroupForm.value,
      name: fieldName
    };
    console.log(updatedField);
    if (this.fieldGroupForm.valid) {
      this.fieldService.updateGroup(updatedField).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss(updatedField);
        this.success('Successfully updated course group');
      }, error => {
        this.error('Unable to update course group. Please try again');
      });
    }
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  resolveFieldGroupType() {
    this.fieldsToDisplay = [];
    this.fieldsToDisplay = [
      ...this.fields.filter(f => {
        return this.fieldGroupType === FieldGroupType.STANDARD && f.fieldType === FieldType.STANDARD
          || this.fieldGroupType === FieldGroupType.MINOR && f.fieldType === FieldType.MINOR
          || this.fieldGroupType === FieldGroupType.ELECTIVE && f.fieldType === FieldType.ELECTIVE;
      })
    ];
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
