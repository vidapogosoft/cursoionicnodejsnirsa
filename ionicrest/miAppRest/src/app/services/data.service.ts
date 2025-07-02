// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // URL base de tu API REST. Reemplázala con la URL de tu backend.
  private apiUrl = 'ruta de apirest'; // ruta de tu api de API 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los posts de la API.
   * @returns Un Observable que emite un array de objetos Post.
   */
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Obtiene un post específico por su ID.
   * @param id El ID del post a obtener.
   * @returns Un Observable que emite un objeto Post.
   */
  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo post.
   * @param post El objeto Post a crear.
   * @returns Un Observable que emite el post creado.
   */
  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  /**
   * Actualiza un post existente.
   * @param id El ID del post a actualizar.
   * @param post El objeto Post con los datos actualizados.
   * @returns Un Observable que emite el post actualizado.
   */
  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, post);
  }

  /**
   * Elimina un post por su ID.
   * @param id El ID del post a eliminar.
   * @returns Un Observable que emite un objeto vacío (o la respuesta del servidor).
   */
  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}