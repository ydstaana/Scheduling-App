import { AssignmentService } from 'src/app/services/assignment.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-update-grade',
  templateUrl: './admin-update-grade.page.html',
  styleUrls: ['./admin-update-grade.page.scss'],
})
export class AdminUpdateGradePage implements OnInit {
  callInProgress = false;
  gradeForm: FormGroup;
  assignment: any;

  constructor(
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private assignmentService: AssignmentService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.gradeForm = this.formBuilder.group({
      grade: [this.assignment.grade, [Validators.required, Validators.max(100), Validators.min(1)]],
      remarks: [this.assignment.remarks, [Validators.required]]
    });
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  updateGrade() {
    if (this.gradeForm.valid) {
      this.assignmentService.update({
        ...this.gradeForm.value,
        id: this.assignment._id,
        isCompleted: true
      }).then(data => {
        console.log(data);
        this.success('Successfully added assignment grade');
        this.popoverCtrl.dismiss({
          ...this.assignment,
          ...this.gradeForm.value,
          isCompleted: true
        });
      }, error => {
        this.error('Unable to add assignment grade. Please try again.');
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
