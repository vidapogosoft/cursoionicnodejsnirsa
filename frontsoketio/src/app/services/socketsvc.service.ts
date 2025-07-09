import { Injectable, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketsvcService {

  private socket!: Socket;
  private mesageSubject: Subject<{user:string, message:string}> = new Subject();

  public message: Observable<{user:string, message:string}> = this.mesageSubject.asObservable();
 
  constructor(ngZone: NgZone) { }

  public setupSocketConnection(): Promise<void> {
    return new Promise((resolve, reject) => {

      this.socket = io("http://localhost:3000", {
        transports: ['websocket','polling'], // priorizar al websocket
        withCredentials: true
      });

      this.socket.on('connect', () => {
        console.log('conectado al servidor principal');
        //aqui va mi metodo o lo que deseo transferiri


        resolve();
      });

      this.socket.on('connect_error', (err) => {
        console.error("Error de conexion al server principal", err);
        reject(err);
      });


      this.socket.on('disconnet', () => {
        console.log('Desconectado del servidor principal');
      });

    });

  }


}
