// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usersURL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  public getAllUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usersURL);
  }

  public eliminarUsuario(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.usersURL}/${id}`);
  }

  public crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.usersURL, usuario);
  }

  public actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.usersURL}/${id}`, usuario);
  }

  public getUsuarioId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usersURL}/${id}`);
  }

  public authenticate(email: string, password: string): Observable<Usuario | null> {
    return this.httpClient.get<Usuario[]>(`${this.usersURL}`).pipe(
      tap(users => console.log('Users fetched from API:', users)), // Log the users array
      map(users => users.find(user => user.email === email && user.password === password) || null),
      catchError(() => of(null))
    );
  }

  public getUserByEmail(email: string): Observable<Usuario | null> {
    return this.httpClient.get<Usuario[]>(`${this.usersURL}`).pipe(
      tap(users => console.log('Users fetched from API:', users)), // Log the users array
      map(users => users.find(user => user.email === email) || null),
      catchError(() => of(null))
    );
  }
  public getUserByUsername(username: string): Observable<Usuario | null> {
    return this.httpClient.get<Usuario[]>(`${this.usersURL}`).pipe(
      tap(users => console.log('Users fetched from API:', users)), // Log the users array
      map(users => users.find(user => user.name === username) || null),
      catchError(() => of(null))
    );
  }
}
