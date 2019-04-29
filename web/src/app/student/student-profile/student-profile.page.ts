import { StorageService, Storage } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { UpdatePasswordModalPage } from 'src/app/update-password-modal/update-password-modal.page';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.page.html',
  styleUrls: ['./student-profile.page.scss'],
})
export class StudentProfilePage implements OnInit {
  callInProgress = false;
  accountForm: FormGroup;
  currentUser: any;
  groups = [];
  currentGroup = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private storageService: StorageService
  ) {
    this.currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
    this.currentGroup = this.currentUser.group ? this.currentUser.group._id : '';
  }

  ngOnInit() {
    this.userService.listUserGroups().then((data: any) => {
      this.groups = data.map(group => {
        return {
          ...group,
          order: +group.name.split(' ')[1]
        };
      })
      .sort((a, b) => ((a.order === b.order) ? 0 : ((a.order > b.order) ? 1 : -1)) );
    });

    this.buildForm();
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
      studentId: [this.currentUser.studentId, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      firstName: [this.currentUser.firstName, [
        Validators.required
      ]],
      middleName: [this.currentUser.middleName, []],
      lastName: [this.currentUser.lastName, [
        Validators.required
      ]],
      email: [this.currentUser.email, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      mobileNumber: [this.currentUser.mobileNumber ? this.currentUser.mobileNumber : '', [
        Validators.required,
        Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'),
        Validators.maxLength(11),
        Validators.minLength(11)
      ]],
      contactPersonName: [this.currentUser.contactPersonName ? this.currentUser.contactPersonName : '', [
        Validators.required
      ]],
      contactPersonNumber: [this.currentUser.contactPersonNumber ? this.currentUser.contactPersonNumber : '', [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ]],
      contactPersonRelationship: [this.currentUser.contactPersonRelationship ? this.currentUser.contactPersonRelationship : '', [
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
        this.userService.getStudent(this.currentUser._id).then(res => {
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

  async updatePassword() {
    const viewModal = await this.popoverCtrl.create({
      component: UpdatePasswordModalPage,
      cssClass: 'smaller-custom-popover',
      backdropDismiss: false
    });

    return await viewModal.present();
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
