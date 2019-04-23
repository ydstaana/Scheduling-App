import { StorageService, Storage } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserType } from '../models/user.model';
import { ModalController, PopoverController } from '@ionic/angular';
import { LostPasswordModalPage } from '../lost-password-modal/lost-password-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  callInProgress = false;
  loginForm: FormGroup;
  isUnauthorized: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
    private popoverCtrl : PopoverController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  login() {
    if (!this.loginForm.invalid && this.loginForm.value['email'] && this.loginForm.value['password']) {
      this.callInProgress = true;

      this.userService.login(this.loginForm.value['email'], this.loginForm.value['password']).then((data: any) => {
        console.log(data);
        const u = this.getUserByResponse(data);
        u.then(user => {
          this.isUnauthorized = false;
          this.callInProgress = false;

          this.storageService.setItem(Storage.CURRENT_USER, JSON.stringify(user));

          switch (data['userType']) {
            case UserType.UST_MEDICINE_ADMIN:
              this.router.navigateByUrl('/admin');
              break;

            case UserType.STUDENT:
              this.router.navigateByUrl('/student');
              break;

            case UserType.FIELD_ADMIN:
              this.router.navigateByUrl('/field-admin');
              break;
          }
        });
      }).catch(error => {
        console.log(error);
        this.callInProgress = false;
        this.isUnauthorized = true;
      });
    }
  }

  getUserByResponse(response: any) {
    switch (response.userType) {
      case UserType.UST_MEDICINE_ADMIN:
        return this.userService.getUMA(response.id);

      case UserType.STUDENT:
        return this.userService.getStudent(response.id);

      case UserType.FIELD_ADMIN:
        return this.userService.getFieldAdmin(response.id);
    }
  }

  async openModal() {
    var modal = await this.popoverCtrl.create({
      component: LostPasswordModalPage
    });

    return await modal.present();
  }
}
