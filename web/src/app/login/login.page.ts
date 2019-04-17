import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserType } from '../models/user.model';

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
    private userService: UserService
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

      this.userService.login(this.loginForm.value['email'], this.loginForm.value['password']).then((data) => {
        // this.storageService.setItem(Storage.ACCESS_TOKEN, data.accessToken);

        this.isUnauthorized = false;
        this.callInProgress = false;

        // TODO: handle token
        // store current user
        // store current permission
        console.log(data);
        switch (data['userType']) {
          case UserType.UST_MEDICINE_ADMIN:
            this.router.navigateByUrl('/admin');
            break;

          case UserType.STUDENT:
            this.router.navigateByUrl('/student');
            break;
        }

        // get user permissions
        // this.userService.getPermissions().then((perm: any) => {
        //   if (!perm || perm.length === 0) {
        //     // no permissions returned
        //     // TODO: Display permission errors
        //     this.router.navigateByUrl('/login');
        //   } else {
        //     this.storageService.setItem(Storage.PERMISSIONS, JSON.stringify(perm.map(p => p.code)));
        //     this.router.navigateByUrl('/reports');
        //     this.resetForm();
        //     this.isUnauthorized = false;
        //     this.callInProgress = false;
        //   }
        // });
      }).catch(error => {
        console.log(error);
        this.callInProgress = false;
        this.isUnauthorized = true;
      });
    }
  }

}
