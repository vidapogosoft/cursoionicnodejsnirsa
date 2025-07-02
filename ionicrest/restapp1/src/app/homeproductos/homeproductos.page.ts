import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homeproductos',
  templateUrl: './homeproductos.page.html',
  styleUrls: ['./homeproductos.page.scss'],
  standalone: false
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
