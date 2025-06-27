import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable} from 'rxjs'

interface User {

  id: number;
  name: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject | undefined;
  private dbready = new BehaviorSubject<boolean>(false);

  constructor(private platform: Platform, private sqlite: SQLite) 
  {
    this.platform.ready().then(()=> { this.createDatabase();})
  }

  getdatabaseState(): Observable<boolean>{
  return this.dbready.asObservable();
  }


  async createDatabase() {
  try {
    this.database = await this.sqlite.create({
      name: 'dbexmple1',
      location: 'default'
    });

    await this.createTables();
    this.dbready.next(true);
    console.log('Base de datos creada y lista.'); 
  } catch (e) {
    console.error("Error al crear o abrir la base de datos:", e);
  }
}

  private async createTables()
  {
      if(!this.database)
      {
        console.error('Base no creada/inicializada');
        return;
      }

      const createUserTable = `
      create table if not exists users
      (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT);
      `;

      await this.database.executeSql(createUserTable, []);

  }

  //metodos de ADO
  async addUser(name: string, email: string): Promise<any>
  {

    if(!this.database)
    {
      return;
    }

    const data = [name, email];

    const sql = 'insert into users (name, email) values (?, ?)';

    try{
      
      const res = await this.database.executeSql(sql, data) 

      return res
    }
    catch(e)
    {
      console.error(JSON.stringify(e));
      throw e;
    }


  }


  async getUser(): Promise<User[]>
  { 
     if(!this.database)
    {
      return [];
    }

    const users: User[] = []
    const sql = 'select * from users'
    try {
      
      const res = await this.database.executeSql(sql,[])
      if(res.rows.lenght > 0)
      {
          for(let i=0; i<res.rows.lenght; i++)
          {
            users.push(res.rows.item(i))
          }
      }

      return users;

    } catch (error) {
      console.error(JSON.stringify(error));
      return [];
    }

  }

  async updateUser(id: number, name: string, email: string): Promise<any>
  {
    
  }

  async deleteUser(id: number): Promise<any>
  {
    
  }
}
