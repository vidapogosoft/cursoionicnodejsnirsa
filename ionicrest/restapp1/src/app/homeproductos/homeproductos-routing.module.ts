import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeproductosPage } from './homeproductos.page';

const routes: Routes = [
  {
    path: '',
    component: HomeproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeproductosPageRoutingModule {}
