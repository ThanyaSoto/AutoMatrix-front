// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userName = new BehaviorSubject<string | null>(this.getUserNameFromStorage());
  private userRole = new BehaviorSubject<string | null>(this.getUserRoleFromStorage());
  private userEmail = new BehaviorSubject<string | null>(this.getUserEmailFromStorage());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUserName() {
    return this.userName.asObservable();
  }

  get currentUserRole() {
    return this.userRole.asObservable();
  }
  get currentUserEmail() {
    return this.userEmail.asObservable();
  }
  private getUserEmailFromStorage(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('email');
    }
    return null;
  }

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  private getUserNameFromStorage(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('userName');
    }
    return null;
  }

  private getUserRoleFromStorage(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  login(username: string, role: string) {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('token', 'user-authenticated');
      localStorage.setItem('userName', username);
      localStorage.setItem('userRole', role);
    }
    this.loggedIn.next(true);
    this.userName.next(username);
    this.userRole.next(role);
  }

  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
    }
    this.loggedIn.next(false);
    this.userName.next(null);
    this.userRole.next(null);
  }
}
