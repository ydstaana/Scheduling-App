import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { UserType } from 'src/app/models/user.model';

@Component({
  selector: 'app-accounts-create',
  templateUrl: './accounts-create.page.html',
  styleUrls: ['./accounts-create.page.scss'],
})
export class AccountsCreatePage implements OnInit {
  callInProgress = false;
  accountForm: FormGroup;

  // user type variables
  userType: string = UserType.STUDENT;
  USER_TYPE_VALUES = UserType;
  USER_TYPE_KEYS = Object.keys(UserType);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
      studentId: ['', [Validators.required, Validators.maxLength(10)]],
      userType: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      middleName: ['', []],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]]
      // TODO: Move to students page
      // mobile: ['', [
      //   Validators.required,
      //   Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
      // ]]
    });
  }

  createAccount() {
    if (this.accountForm.valid) {
      this.userService.create(this.accountForm.value).then(data => {
        console.log(data);
        this.popoverCtrl.dismiss();
        this.success('Successfully created an account');
      }, error => {
        this.error('Unable to create user. Please try again');
      });
    }
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  resolveAccountType() {
    const studentNumberCtrl = this.accountForm.get('studentId');
    if (this.userType === UserType.STUDENT) {
      studentNumberCtrl.setValue('');
    } else {
      studentNumberCtrl.setValue('dummy');
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
