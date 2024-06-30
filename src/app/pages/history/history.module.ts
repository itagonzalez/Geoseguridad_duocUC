import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryRoutingModule,
    RouterModule
  ],
  declarations: [HistoryPage]
})
export class HistoryModule {}
