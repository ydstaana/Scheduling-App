import { FieldService } from './../../../services/field.service';
import { ToastController, PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fields-update',
  templateUrl: './fields-update.page.html',
  styleUrls: ['./fields-update.page.scss'],
})
export class FieldsUpdatePage implements OnInit {
  field: any;
  callInProgress = false;
  fieldForm: FormGroup;
  admins = [];

  constructor(
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private fieldService: FieldService
  ) { }

  ngOnInit() {
    this.buildForm();

    this.fieldService.listAdmins().then(data => {
      this.admins = data;
    });
  }

  buildForm() {
    this.fieldForm = this.formBuilder.group({
      name: [this.field.name, [Validators.required]],
      address: [this.field.address, [
        Validators.required
      ]],
      adminId: [this.field.admin.id, [
        Validators.required
      ]],
      isActive: [this.field.isActive, []]
    });
  }

  updateField() {
    const updatedField = {
      ...this.field,
      ...this.fieldForm.value
    };
    console.log(updatedField);
    if (this.fieldForm.valid) {
      this.fieldService.update(updatedField).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss(updatedField);
        this.success('Successfully updated field');
      }, error => {
        this.error('Unable to update field. Please try again');
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
