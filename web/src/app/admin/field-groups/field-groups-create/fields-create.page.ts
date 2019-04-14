import { FieldService } from './../../../services/field.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fields-create',
  templateUrl: './fields-create.page.html',
  styleUrls: ['./fields-create.page.scss'],
})
export class FieldsCreatePage implements OnInit {
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
      name: ['', [Validators.required]],
      address: ['', [
        Validators.required
      ]],
      adminId: ['', [
        Validators.required
      ]]
    });
  }

  createField() {
    console.log(this.fieldForm.value);
    if (this.fieldForm.valid) {
      this.fieldService.create(this.fieldForm.value).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss();
        this.success('Successfully created a field');
      }, error => {
        this.error('Unable to create field. Please try again');
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