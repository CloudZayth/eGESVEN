import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarinaPage } from './harina.page';

const routes: Routes = [
  {
    path: '',
    component: HarinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HarinaPageRoutingModule {}
