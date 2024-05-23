import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usersURL='http://localhost:3000/users';

  constructor(private httpClient:HttpClient) { }
  public getAllUsuarios(){
    return this.httpClient.get(`${this.usersURL}`);
  }
  public eliminarUsuario(id:number){
    return this.httpClient.delete(`${this.usersURL}/${id}`);
  }
  public crearUsuario(usuario:Usuario){
    return this.httpClient.post(`${this.usersURL}`,usuario);
  }
  public actualizarUsuario(id:number,usuario:any){
    return this.httpClient.put(`${this.usersURL}/${id}`,usuario);
  }
  public getUsuarioId(id:number){
    return this.httpClient.get(`${this.usersURL}/${id}`);
  }
  
}
