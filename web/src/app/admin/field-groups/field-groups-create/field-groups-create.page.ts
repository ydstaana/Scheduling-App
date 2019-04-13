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

  constructor(
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private fieldService: FieldService
  ) { }

  ngOnInit() {
    this.buildForm();

    this.fieldService.list().then(data => {
      this.fields = data;
    });
  }

  buildForm() {
    this.fieldGroupForm = this.formBuilder.group({
      fields: ['', [Validators.required]]
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
