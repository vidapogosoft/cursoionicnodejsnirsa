import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
 @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  map: any;
  latitude: number | undefined;
  longitude: number | undefined;
  marker: any; 

  constructor( private platform: Platform ) {}

  async ngOnInit() {
    await this.platform.ready(); 
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
      };

      const position = await Geolocation.getCurrentPosition(options);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      
      console.log('Position Actual:', this.latitude, this.longitude );
      
      this.loadMap();

    } catch (error) {
      console.error("Error en location", error);
      alert("No se pudo obtner la ubicacion, Verficar los permisos");
    }
  }

  loadMap() {
    if (this.latitude && this.longitude && this.mapElement) {
      const latLng = new google.maps.LatLng(this.latitude, this.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

     
      if (this.map) {
        this.map.setCenter(latLng);
        if (this.marker) {
          this.marker.setPosition(latLng);
        } else {
          this.addMarker(latLng);
        }
      } else {
        
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker(latLng);
      }
    }
  }

  addMarker(latLng: any) {
    this.marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        animation: google.maps.Animation.DROP,
        title: 'Mi Ubicacion'
    });
  }

}
