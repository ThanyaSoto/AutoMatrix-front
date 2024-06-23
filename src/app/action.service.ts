// action.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actionsURL = 'http://localhost:3000/actions';

  constructor(private httpClient: HttpClient) {}

  public getAllActions(): Observable<Action[]> {
    return this.httpClient.get<Action[]>(this.actionsURL);
  }

  public crearAction(action: Partial<Action>, userId: number): Observable<Action> {

    const actionWithUserId = { ...action, userId };
    return this.httpClient.post<Action>(this.actionsURL, actionWithUserId);
  }
  

  public getActionId(id: number): Observable<Action> {
    return this.httpClient.get<Action>(`${this.actionsURL}/${id}`);
  }
}
