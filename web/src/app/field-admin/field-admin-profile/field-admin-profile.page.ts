import { PopoverController, ToastController } from '@ionic/angular';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { StorageService, Storage } from 'src/app/services/storage.service';

@Component({
  selector: 'app-field-admin-profile',
  templateUrl: './field-admin-profile.page.html',
  styleUrls: ['./field-admin-profile.page.scss'],
})
export class FieldAdminProfilePage implements OnInit {
  callInProgress = false;
  accountForm: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private storageService: StorageService
  ) {
    this.currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
      firstName: [this.currentUser.firstName, [
        Validators.required
      ]],
      middleName: [this.currentUser.middleName, [
        Validators.required
      ]],
      lastName: [this.currentUser.lastName, [
        Validators.required
      ]],
      email: [this.currentUser.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      mobileNumber: [this.currentUser.mobileNumber ? this.currentUser.mobileNumber : '', [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
      ]],
      contactPersonName: [this.currentUser.contactPersonName ? this.currentUser.contactPersonName : '', [
        Validators.required
      ]],
      contactPersonNumber: [this.currentUser.contactPersonNumber ? this.currentUser.contactPersonNumber : '', [
        Validators.required
      ]]
    });
  }

  updateProfile() {
    if (this.accountForm.valid) {
      this.callInProgress = true;
      this.userService.updateProfile({
        ...this.accountForm.value,
        id: this.currentUser._id
      }).then(data => {
        this.userService.getFieldAdmin(this.currentUser._id).then(res => {
          this.callInProgress = false;
          this.storageService.setItem(Storage.CURRENT_USER, JSON.stringify(res));
          this.success('Successfully update profile information');
        });
      }, error => {
        this.callInProgress = false;
        this.error('Unable to update profile information. Please try again');
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
