import { UserType } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.page.html',
  styleUrls: ['./accounts-view.page.scss'],
})
export class AccountsViewPage implements OnInit {
  user: any;
  currentTab = 'PERSONAL_INFORMATION';
  isEdit = false;

  accountForm: FormGroup;

  // user type variables
  userType: string = UserType.STUDENT;
  USER_TYPE_VALUES = UserType;
  USER_TYPE_KEYS = Object.keys(UserType);

  constructor(
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.buildForm();

    this.userType = this.user.role;
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
      studentNumber: [this.user.id, [Validators.required]],
      accountType: ['', [
        Validators.required
      ]],
      firstName: [this.user.firstName, [
        Validators.required
      ]],
      middleName: [this.user.middleName, [
        Validators.required
      ]],
      lastName: [this.user.lastName, [
        Validators.required
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      mobile: [this.user.mobileNumber, [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
      ]]
    });
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  toggleView(tab) {
    this.currentTab = tab;
  }

  resolveAccountType() {
    const studentNumberCtrl = this.accountForm.get('studentNumber');
    if (this.userType === UserType.STUDENT) {
      studentNumberCtrl.setValue('');
    } else {
      studentNumberCtrl.setValue('dummy');
    }
  }

  updateAccount() {
    const updatedUser = {
      ...this.user,
      ...this.accountForm.value
    };
    if (this.accountForm.valid) {
      this.userService.update(updatedUser).then(data => {
        this.user = updatedUser;
        this.success('Successfully updated account');
      }, error => {
        this.error('Unable to update account. Please try again');
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
