// lista-intenciones.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../auth.service';
import { Action, Usuario } from '../usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-intenciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-intenciones.component.html',
  styleUrls: ['./lista-intenciones.component.css']
})
export class ListaIntencionesComponent implements OnInit {
  usuarios: Usuario[] = [];
  selectedUser: Usuario | null = null;
  isAdmin: boolean = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsuarios();
    this.authService.currentUserRole.subscribe(role => {
      this.isAdmin = (role === 'Admin');
    });

    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.resetState();
      } else {
        this.loadUsuarios();
      }
    });
  }

  loadUsuarios(): void {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (dato: Usuario[]) => {
        this.usuarios = dato;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  resetState(): void {
    this.usuarios = [];
    this.selectedUser = null;
    this.isAdmin = false;
  }

  onSelectUser(user: Usuario): void {
    this.selectedUser = {
      ...user,
      actions: user.actions ? [...user.actions].sort((a: Action, b: Action) => a.id - b.id) : []
    };
  }

  eliminarUsuario(id: number | undefined): void {
    if (id !== undefined) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
        if (this.selectedUser && this.selectedUser.id === id) {
          this.selectedUser = null;
        }
      });
    } else {
      console.error('El id del usuario es undefined');
    }
  }
}
