import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor( private http: HttpClient) { }

  //consulta del intro - el api principal

  getCharacters(params: any)
  {
    return this.http.get(environment.baseURL + environment.character, {params} );
  }

  //filtrado de get
  getCharacterById(id: string)
  {
    return this.http.get(environment.baseURL + environment.character + '/' + id );
  }


}
