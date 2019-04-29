import { AssignmentService } from 'src/app/services/assignment.service';
import { ScheduleChangesPage } from './../schedule-changes/schedule-changes.page';
import { ScheduleService } from './../../../services/schedule.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RotationService } from 'src/app/services/rotation.service';
import { StorageService, Storage } from 'src/app/services/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-change-schedule-requests-create',
  templateUrl: './change-schedule-requests-create.page.html',
  styleUrls: ['./change-schedule-requests-create.page.scss'],
})
export class ChangeScheduleRequestsCreatePage implements OnInit {
  rotations = [];
  assignments = [];
  assignmentRotations = [];
  selectedAssignment: any;
  selectedCurrentRotation: any;
  selectedProposedRotation: any;
  requestForm: FormGroup;
  message = '';
  callInProgress = false;

  // filtered selections
  availableRotations = [];

  // payload request objects
  oldAssignments = [];
  newAssignments = [];

  currentUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private rotationService: RotationService,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private scheduleService: ScheduleService,
    private storageService: StorageService,
    private assignmentService: AssignmentService
  ) {
    this.currentUser = JSON.parse(this.storageService.getItem(Storage.CURRENT_USER));
  }

  ngOnInit() {
    this.buildForm();
    this.listAssignments();
    this.listRotations();
  }

  ionViewWillEnter() {
    this.listAssignments();
    this.listRotations();
  }

  buildForm() {
    this.requestForm = this.formBuilder.group({
      rotation: ['', [Validators.required]],
      assignment: [null, [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  createRequest() {
    this.callInProgress = true;
    const req = {
      requestType: 'SwitchRequest',
      newAssignments: this.newAssignments.map(na => {
        return {
          field: na.field._id,
          student: na.student._id,
          rotation: na.rotation._id,
          group: na.group._id
        };
      }),
      oldAssignments: this.oldAssignments.map(oa => oa._id),
      message: this.message,
      student: this.currentUser._id
    };

    this.scheduleService.createChangeRequest(req).then(data => {
      console.log(data);
      this.callInProgress = false;
      this.success('Successfully created switch schedule request.');
      this.dismiss();
    }, error => {
      this.callInProgress = false;
      this.error('Unable to create switch schedule request. Please try again.');
    });
  }

  listAssignments() {
    this.assignmentService.listByStudent(
      this.currentUser._id
    ).then((data: any) => {
      this.assignments = data.filter(d => d.isActive);
      if (this.assignments) {
        this.assignmentRotations = this.removeDuplicates(
          this.assignments.map(assignment => {
            return assignment.rotation;
          })
        ).sort((a, b) => {
          return moment(a.schedule.startDate).isAfter(moment(b.schedule.startDate)) ? 1 : -1;
        });
      }
    });
  }

  listRotations() {
    this.rotationService.list().then((data: any) => {
      this.rotations = data.filter(d => d.isActive);
    });
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  filterAssignmentsByCurrentRotation() {
    // get all assignments with same fields
    return [
      ...(
        this.selectedCurrentRotation.field
          ? this.assignments.filter(assignment => {
            return assignment.field._id === this.selectedCurrentRotation.field._id;
          })
          : this.selectedCurrentRotation.fieldGroup.fields.map(field => {
            return this.assignments.filter(assignment => {
              return assignment.field._id === field._id;
            });
          })
          .flat()
      )
    ];
  }

  filterAssignmentsByProposedRotation() {
    // get all assignments with same fields
    return [
      ...(
        this.selectedProposedRotation.field
          ? this.assignments.filter(assignment => {
            return assignment.field._id === this.selectedProposedRotation.field._id;
          })
          : this.selectedProposedRotation.fieldGroup.fields.map(field => {
            return this.assignments.filter(assignment => {
              return assignment.field._id === field._id;
            });
          })
          .flat()
      )
    ];
  }

  resolveCurrentRotation() {
    this.newAssignments = [];
    this.oldAssignments = [];

    // filter all rotations with same schedule
    this.availableRotations = this.rotations.filter(rotation => {
      // TODO: Implement
      // if (rotation.field) {
      //   if (this.selectedCurrentRotation.field) {
      //     return rotation.schedule._id === this.selectedCurrentRotation.schedule._id &&
      //       rotation.field._id === this.selectedCurrentRotation.field._id;
      //   } else {
      //     return rotation.schedule._id === this.selectedCurrentRotation.schedule._id;
      //   }
      // } else {
      //   if (this.selectedCurrentRotation.field) {
      //     return rotation.schedule._id === this.selectedCurrentRotation.schedule._id;
      //   } else {
      //     return rotation.schedule._id === this.selectedCurrentRotation.schedule._id &&
      //       rotation.fieldGroup._id === this.selectedCurrentRotation.fieldGroup._id;
      //   }
      // }
      return rotation.schedule._id === this.selectedCurrentRotation.schedule._id;
    });
  }

  resolveSelectedRotation() {
    // refilter old assignments
    // this.filterOldAssignmentsByCurrentRotation();

    // create new assignments based on proposed rotation
    console.log(this.selectedProposedRotation);
    this.newAssignments = [];
    this.oldAssignments = [];

    const assignments = this.filterAssignmentsByProposedRotation();
    console.log(assignments);
    assignments.forEach(a => {
      const suggestedRotation = this.rotations.find(r => {
        return r.schedule._id === this.selectedCurrentRotation.schedule._id
          && (r.field && r.field._id === a.field._id || r.fieldGroup && r.fieldGroup.fields.find(f => f._id === a.field._id));
      });

      this.newAssignments.push({
        field: a.field,
        student: a.student,
        rotation: suggestedRotation,
        group: suggestedRotation.group
      });
    });

    this.oldAssignments = [
      ...this.oldAssignments,
      ...assignments
    ];

    console.log(this.oldAssignments);
    console.log(this.newAssignments);

    // get other affected assignments
    // get all assignments with same fields as current rotation fields
    const affectedAssignments = this.filterAssignmentsByCurrentRotation();

    // add them to old assignments for deactivation
    this.oldAssignments = [
      ...this.oldAssignments,
      ...affectedAssignments
    ];

    console.log(affectedAssignments);
    // create new assignments for affected assignments
    affectedAssignments.forEach(affected => {
      const suggestedRotation = this.rotations.find(r => {
        return r.schedule._id === assignments[0].rotation.schedule._id
          && (
            (
              r.field && (
                this.selectedCurrentRotation.field
                ? r.field._id === this.selectedCurrentRotation.field._id
                : this.selectedCurrentRotation.fieldGroup.fields.map(fs => fs._id).includes(r.field._id)
              )
            )
            || (
              r.fieldGroup && r.fieldGroup.fields.find(f => {
                return this.selectedCurrentRotation.field
                  ? f._id === this.selectedCurrentRotation.field._id
                  : this.selectedCurrentRotation.fieldGroup.fields.map(fs => fs._id).includes(f._id);
              })
            )
          );
      });

      console.log(suggestedRotation);

      this.newAssignments.push({
        student: affected.student,
        field: affected.field,
        rotation: suggestedRotation,
        group: suggestedRotation.group
      });
    });
    console.log(this.oldAssignments);
    console.log(this.newAssignments);
  }

  removeDuplicates(arr: any) {
    const arr_names = arr.map(a => a.field ? a.field.name : a.fieldGroup.name);
    const unique_arr_names = Array.from(new Set(arr_names));
    return unique_arr_names.map(name => {
      return arr.find(a => a.field ? a.field.name === name : a.fieldGroup.name === name);
    });
  }

  async viewChanges() {
    const viewModal = await this.popoverCtrl.create({
      component: ScheduleChangesPage,
      componentProps: {
        assignments: this.newAssignments
      },
      cssClass: 'custom-popover',
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
