import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';


interface User{
  id: number;
  name: string;
  email: string
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  users: User[] = [];
  newUser= {name: '', email: ''};
  selectedUser: User | null = null;


  constructor(

    private databaservice: DatabaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.databaservice.getdatabaseState().subscribe((rdy) => {
      if(rdy)
      {
        this.loadUsers();
      }
    });
    
  }

  async loadUsers()
  {
    try {
      
      this.users = await this.databaservice.getUser();

    } catch (error) {
      this.showAlert('Error', 'Error en la carga');      
    }    

  }

  async addUser()
  {
    if(this.newUser.name && this.newUser.email)
    {
      try {

        await this.databaservice.addUser(this.newUser.name, this.newUser.email);
        this. newUser= {name: '', email: ''};
        this.loadUsers();
        this.showAlert("Exito", "Registro de usuario correcto");
      } catch (error) {
        this.showAlert("Error", "Error en registro");
      }
    }
    else
    {
      this.showAlert('Advertencia', 'Introduce nombre y email');
    }
  }


  SelectUser(user: User)
  {
    this.selectedUser = {...user};
  }

  async showAlert(headerin: string, messagein: string)
  {
      const alert = await this.alertController.create({
          header: headerin,
          message: messagein,
          buttons: ['OK']
      });

      await alert.present();
  }

}
