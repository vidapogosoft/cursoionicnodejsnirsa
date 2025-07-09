import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonFooter, IonButton, IonInput, IonLabel } from '@ionic/angular/standalone';
import { SocketsvcService } from '../services/socketsvc.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

interface Message {
  user: string;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonLabel, FormsModule, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonInput, IonButton],
})
export class HomePage implements OnInit, OnDestroy {

  currentUser: string = 'usuario_' + Math.floor(Math.random()*100);
  messageText: string="";
  messages: Message[] = [];

  private messageSubscription!: Subscription


  constructor(
    private socketsvc: SocketsvcService
  ) {}

  ngOnInit(): void {
      this.socketsvc.setupSocketConnection().then(()=>{
        console.log('Conexion iniciada correctamente ==> Front')
        this.messageSubscription = this.socketsvc.message.subscribe(msg => {
          this.messages.push({user: msg.user, text: msg.message});
        });

      }).catch(
        err => console.error('Error en conexion desde el front', err)
      );
  }

  sendMessage() {
    if(this.messageText.trim())
    {
      this.socketsvc.sendMessage(this.currentUser, this.messageText).then(() =>{

        this.messageText = "";

      }).catch(
        err => console.error('Error al enviar mensaje desde el front', err)
      );
    }
  }

  ngOnDestroy(): void {
      if(this.messageSubscription)
      {
        this.messageSubscription.unsubscribe();
      }
      this.socketsvc.disconnetSocket();
  }

}
