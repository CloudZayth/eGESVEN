import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HarinaPageRoutingModule } from './harina-routing.module';

import { HarinaPage } from './harina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HarinaPageRoutingModule
  ],
  declarations: [HarinaPage]
})
export class HarinaPageModule {}
