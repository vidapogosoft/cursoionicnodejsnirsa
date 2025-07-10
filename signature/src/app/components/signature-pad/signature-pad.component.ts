import { Component, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad'
import { IonCard, IonCardHeader, IonCardTitle, IonButton, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
  imports: [IonCardContent, IonButton, IonCardHeader, IonCard, IonCardTitle, CommonModule],
})
export class SignaturePadComponent  implements AfterViewInit {

  @ViewChild('signatureCanvas') signaturecanvas!: ElementRef;
  signaturepad!: SignaturePad;
  signatureImage: string | null = null;

  constructor() { }

  ngAfterViewInit() {
     this.initsignaturepad();
  }

  initsignaturepad(){
  
    const canvas = this.signaturecanvas.nativeElement;

    //establecer dimensiones
    //canvas.width = canvas.offsetWidth;
    //canvas.height = canvas.offsetHeight;

    this.signaturepad = new SignaturePad( canvas, {

      backgroundColor: 'rgb(255, 255, 255)', // Color de fondo
      penColor: 'rgb(0, 0, 0)', // Color del bolígrafo
    });
  }

  clearSignature(){
    this.signaturepad.clear();
    this.signatureImage = null;
  }

  saveSignature(){

    if(this.signaturepad.isEmpty())
    {
      alert('proporcione una firma');
      return;
    }

    this.signatureImage = this.signaturepad.toDataURL();

    console.log('url de la firma', this.signatureImage);

  }

  //opcional: redimensionar el canvas
  onResize(){
    this.signaturepad.off(); //disvincula event0
    this.initsignaturepad();
  }

}
