import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendancePage } from './attendance.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceRoutingModule,
    RouterModule
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule {}
