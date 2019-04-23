import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lost-password-modal',
  templateUrl: './lost-password-modal.page.html',
  styleUrls: ['./lost-password-modal.page.scss'],
})
export class LostPasswordModalPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private toastCtrl : ToastController,
    private popoverCtrl : PopoverController
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email : ['', Validators.required]
    });
  }

  resetPassword() {
    this.userService.resetPassword(this.form.get('email').value).then(() => {
      this.success("Successfully reset password");
      this.popoverCtrl.dismiss();
    })
    .catch(err => {
      this.error("Reset password unsuccessful");
    })
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
