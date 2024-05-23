import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})

export class ActionService {

  private actionsURL='http://localhost:3000/actions'
  
  constructor(private httpClient:HttpClient) { }
  public getAllActions(){
    return this.httpClient.get(`${this.actionsURL}`);
  }

  public crearAction(usuario:Action){
    return this.httpClient.post(`${this.actionsURL}`,usuario);
  }

  public getActionId(id:number){
    return this.httpClient.get(`${this.actionsURL}/${id}`);
  }
}
