import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeproductosPageRoutingModule } from './homeproductos-routing.module';

import { HomeproductosPage } from './homeproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeproductosPageRoutingModule
  ],
  declarations: [HomeproductosPage]
})
export class HomeproductosPageModule {}
