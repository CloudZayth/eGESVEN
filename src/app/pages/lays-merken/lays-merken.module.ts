import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaysMerkenPageRoutingModule } from './lays-merken-routing.module';

import { LaysMerkenPage } from './lays-merken.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaysMerkenPageRoutingModule
  ],
  declarations: [LaysMerkenPage]
})
export class LaysMerkenPageModule {}
