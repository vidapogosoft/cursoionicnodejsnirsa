import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  capturedImage: string | undefined;


  constructor(private platform: Platform) {}

  async ngOnInit() {
      
    await this.platform.ready().then( async () =>
      {
          const granted = await LocalNotifications.requestPermissions();
          if(granted.display === "granted")
          {
              console.log("permiso concedido");
          }
          else{
            console.log("permiso no concedido");
          }

      });
    
  }

  async scheduleSimpleNotification()
  {
    await LocalNotifications.schedule(
      {
        notifications:[
          {
            title: "Titulo: notificacion local 1",
            body: "Body: notificacion desde ionico mobile",
            id: 1,
            schedule: {at: new Date(Date.now() + 100 * 5)},
            extra:{ data: "Dato extra de la notificacion"} 
          }
        ]
      });
      alert("Notificacion se presenta en 5 segundos");
  }

  async scheduleRepeatedNotification()
  {
    await LocalNotifications.schedule(
      {
        notifications:[
          {
            title: "Titulo: notificacion local 2",
            body: "Body: notificacion desde ionico mobile",
            id: 2,
            schedule: {
              every: "minute"
            },
            extra:{ data: "Dato extra de la notificacion diaria"} 
          }
        ]
      });
      alert("Notificacion diaria");
  }

  async listenPendingNotifications()
  {
      const pending = await LocalNotifications.getPending();

      console.log('Notificaciones pendientes:', pending.notifications);

      alert(`Tienes ${pending.notifications.length} notificaciones pendientes en la consola.`);
 
  }

  async cancelAllNotificactions()
  {
    await LocalNotifications.cancel({ notifications: (await LocalNotifications.getPending()).notifications });
    alert("Todas las notificaciones han sido canceladas");
  }

  async takePicture()
  {
      try {
        
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            //saveToGallery: true
        });

        this.capturedImage = image.webPath

        if(image.base64String)
        {

        }else if(image.webPath)
        {
          const response = await fetch(image.webPath);
          const blob = await response.blob();

          const reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onloadend = () => {

              const base64data = reader.result as string;
              console.log("Guardar en sqlite");

          }

        }

      } catch (error) {
        
      }
  }

  async openGallery()
  {
    try {
      
      const image: Photo = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Uri,
            source: CameraSource.Photos
            //saveToGallery: true
        });

         this.capturedImage = image.webPath

    } catch (error) {
      
    }
  }

}
