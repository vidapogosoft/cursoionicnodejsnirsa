import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-homeproductos',
  templateUrl: './homeproductos.page.html',
  styleUrls: ['./homeproductos.page.scss'],
})
export class HomeproductosPage implements OnInit {

  products: any[] = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.getHomeproductos();
  }

  getHomeproductos()
  {
    this.data.getHome().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
          alert(error);
      }
    )
  }

}
