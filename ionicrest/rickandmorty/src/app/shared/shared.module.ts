import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RestService } from '../services/rest.service';




@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    CommonModule, HttpClientModule, RouterModule
  ],
  providers: [RestService]
})
export class SharedModule { }
