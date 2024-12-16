import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BebidasSnacksPageRoutingModule } from './bebidas-snacks-routing.module';

import { BebidasSnacksPage } from './bebidas-snacks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BebidasSnacksPageRoutingModule
  ],
  declarations: [BebidasSnacksPage]
})
export class BebidasSnacksPageModule {}
