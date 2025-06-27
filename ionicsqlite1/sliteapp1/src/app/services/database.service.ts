import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.createDatabase();
    }).catch(e => {
      console.error("Error en platform.ready():", e);
      this.dbready.next(false); 
    });
  }

  getdatabaseState(): Observable<boolean> {
    return this.dbready.asObservable();
  }

  async createDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'dbexmple1.db',
        location: 'default'
      });

      await this.createTables();
      this.dbready.next(true);
      console.log('Base de datos "dbexmple1.db" creada y tablas inicializadas.');
    } catch (e) {
      console.error("Error al crear o abrir la base de datos:", e);
      this.dbready.next(false);
    }
  }

  private async createTables() {
    if (!this.database) {
      console.error('Base de datos no creada/inicializada al intentar crear tablas.');
      return;
    }

    const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      );
    `;

    try {
      await this.database.executeSql(createUserTable, []);
      console.log('Tabla "users" creada o ya existente.');
    } catch (e) {
      console.error("Error al crear la tabla 'users':", e);
      throw e;
    }
  }

  // Métodos de ADO
  async addUser(name: string, email: string): Promise<any> {
    if (!this.database) {
      console.error('Base de datos no disponible para añadir usuario.');
      throw new Error('Database not ready.');
    }

    const data = [name, email];
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';

    try {
      const res = await this.database.executeSql(sql, data);
      console.log('Usuario añadido:', res);
      return res;
    } catch (e) {
      console.error("Error al añadir usuario:", JSON.stringify(e));
      throw e;
    }
  }

  async getUser(): Promise<User[]> {
    if (!this.database) {
      console.error('Base de datos no disponible para obtener usuarios.');
      return [];
    }

    const users: User[] = [];
    const sql = 'SELECT * FROM users';
    try {
      const res = await this.database.executeSql(sql, []);
      if (res.rows.length > 0) { 
        for (let i = 0; i < res.rows.length; i++) { 
          users.push(res.rows.item(i));
        }
      }
      console.log('Usuarios obtenidos:', users);
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", JSON.stringify(error));
      return [];
    }
  }

  async updateUser(id: number, name: string, email: string): Promise<any> {
    if (!this.database) {
      console.error('Base de datos no disponible para actualizar usuario.');
      throw new Error('Database not ready.');
    }

    const data = [name, email, id];
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

    try {
      const res = await this.database.executeSql(sql, data);
      console.log('Usuario actualizado:', res);
      return res;
    } catch (e) {
      console.error("Error al actualizar usuario:", JSON.stringify(e));
      throw e;
    }
  }

  async deleteUser(id: number): Promise<any> {
    if (!this.database) {
      console.error('Base de datos no disponible para eliminar usuario.');
      throw new Error('Database not ready.');
    }

    const data = [id];
    const sql = 'DELETE FROM users WHERE id = ?';

    try {
      const res = await this.database.executeSql(sql, data);
      console.log('Usuario eliminado:', res);
      return res;
    } catch (e) {
      console.error("Error al eliminar usuario:", JSON.stringify(e));
      throw e;
    }
  }
}