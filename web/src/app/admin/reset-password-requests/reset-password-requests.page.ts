import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password-requests',
  templateUrl: './reset-password-requests.page.html',
  styleUrls: ['./reset-password-requests.page.scss'],
})
export class ResetPasswordRequestsPage implements OnInit {
  requests = [];
  p: any;

  constructor(
    private userService: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.listRequests();
  }

  ionViewWillEnter() {
    this.listRequests();
  }

  approve(request: any) {
    this.userService.updateResetPasswordRequest(request._id, {
      ...request,
      isApproved: true,
      isPending: false
    }).then(data => {
      this.success('Successfully approved request');
      this.listRequests();
    }, error => {
      this.error('Unable to approve request. Please try again.');
    });
  }

  decline(request: any) {
    this.userService.updateResetPasswordRequest(request._id, {
      ...request,
      isApproved: false,
      isPending: false
    }).then(data => {
      this.success('Successfully declined request');
      this.listRequests();
    }, error => {
      this.error('Unable to decline request. Please try again.');
    });
  }

  listRequests() {
    this.userService.listResetPasswordRequests().then((data: any) => {
      this.requests = data;
    });
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
