import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaysMerkenPage } from './lays-merken.page';

const routes: Routes = [
  {
    path: '',
    component: LaysMerkenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaysMerkenPageRoutingModule {}
