import { Component } from '@angular/core';

import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  capturedImage: string | undefined;


  constructor() {}

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
