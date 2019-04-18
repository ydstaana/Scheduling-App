import { StorageService, Storage } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {
  callInProgress = false;
  accountForm: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    // Promise.resolve(
    //   JSON.parse(this.storageService.getItem(Storage.CURRENT_USER))
    // ).then(u => {
    //   this.currentUser = u;
    //   this.buildForm();
    // });

    this.currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
    console.log(this.currentUser);
    this.buildForm();
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
      studentId: [this.currentUser.studentId, [Validators.required]],
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
      mobileNumber: [this.currentUser.mobileNumber, [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
      ]],
      contactPersonName: [this.currentUser.contactPersonName, [
        Validators.required
      ]],
      contactPersonNumber: [this.currentUser.contactPersonNumber, [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
      ]]
    });
  }

  updateAccount() {
    if (this.accountForm.valid) {
      console.log({
        ...this.currentUser,
        ...this.accountForm.value
      });
      this.userService.update({
        ...this.currentUser,
        ...this.accountForm.value
      }).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss();
        this.success('Successfully updated profile');
      }, error => {
        this.error('Unable to update profile. Please try again');
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
