import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false, // Asegúrate de que esto sea correcto para la configuración de tu proyecto
})
export class Tab3Page implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  map: any;
  latitude: number | undefined;
  longitude: number | undefined;
  marker: any;
  currentAddress: string = 'Obteniendo dirección...';

  constructor(private platform: Platform) {}

  async ngOnInit() {
    await this.platform.ready();
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000, // Aumentado el tiempo de espera para mejor precisión en algunos casos
        maximumAge: 0,
      };

      const position = await Geolocation.getCurrentPosition(options);
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      console.log('Posición Actual:', this.latitude, this.longitude);

      this.loadMap();
      this.getAddressFromCoordinates(this.latitude, this.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      alert('No se pudo obtener su ubicación. Por favor, verifique los permisos.');
    }
  }

  loadMap() {
    // Asegurarse de que mapElement esté disponible antes de intentar acceder a nativeElement
    if (!this.mapElement) {
      console.error('Elemento del mapa no encontrado.');
      return;
    }

    if (this.latitude !== undefined && this.longitude !== undefined) {
      const latLng = new google.maps.LatLng(this.latitude, this.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      if (!this.map) {
        // Inicializar el mapa solo una vez
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker(latLng);
      } else {
        // Si el mapa ya existe, solo actualiza su centro y la posición del marcador
        this.map.setCenter(latLng);
        if (this.marker) {
          this.marker.setPosition(latLng);
        } else {
          this.addMarker(latLng);
        }
      }
    } else {
      console.warn('Latitud o Longitud indefinidas. No se puede cargar el mapa.');
    }
  }

  addMarker(latLng: any) {
    if (this.marker) {
      // Si ya existe un marcador, actualiza su posición en lugar de crear uno nuevo
      this.marker.setPosition(latLng);
    } else {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        animation: google.maps.Animation.DROP,
        title: 'Mi Ubicación',
      });
    }
  }
  
  async getAddressFromCoordinates(lat: number, lng: number) {
    if (typeof google === 'undefined' || !google.maps || !google.maps.Geocoder) {
      console.warn('Google Maps Geocoder no está disponible. Asegúrese de que la API de Google Maps esté cargada correctamente.');
      this.currentAddress = 'API de Geocodificación no disponible.';
      return;
    }

    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(lat, lng);

    try {
      const response = await geocoder.geocode({ 'location': latLng });

      if (response.results && response.results.length > 0) {
        this.currentAddress = response.results[0].formatted_address;
        console.log('Dirección obtenida:', this.currentAddress);
      } else {
        this.currentAddress = 'Dirección no encontrada.';
        console.warn('No se encontraron resultados para la geocodificación inversa.');
      }
    } catch (error) {
      console.error('Error en la geocodificación inversa:', error);
      this.currentAddress = 'Error al obtener la dirección.';
      alert('Error al obtener la dirección de su ubicación.');
    }
  }
}