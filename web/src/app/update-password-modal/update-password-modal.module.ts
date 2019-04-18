import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UpdatePasswordModalPage } from './update-password-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatePasswordModalPage],
  exports: [
    UpdatePasswordModalPage
  ]
})
export class UpdatePasswordModalPageModule {}
