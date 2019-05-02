import { StorageService, Storage } from 'src/app/services/storage.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  };
}

@Component({
  selector: 'app-update-password-modal',
  templateUrl: './update-password-modal.page.html',
  styleUrls: ['./update-password-modal.page.scss'],
})
export class UpdatePasswordModalPage implements OnInit {
  passwordForm: FormGroup;
  callInProgress = false;
  currentUser: any;
  newPassword = '';
  oldPassword = '';

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
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [
        Validators.required,
        // Validators.minLength(8),
        Validators.maxLength(32)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.callInProgress = true;
      this.userService.changePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        id: this.currentUser._id,
        email: this.currentUser.email
      }).then(data => {
        this.dismiss();
        this.success('Successfully updated password');
      }, error => {
        this.callInProgress = false;
        this.error('Unable to update password. Please try again');
      });
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
