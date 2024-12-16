import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BebidasSnacksPage } from './bebidas-snacks.page';

const routes: Routes = [
  {
    path: '',
    component: BebidasSnacksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BebidasSnacksPageRoutingModule {}
