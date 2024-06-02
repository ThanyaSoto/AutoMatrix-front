import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario.service';
import { ActionService } from '../action.service';
import { Usuario, Action } from '../usuario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostrarAlerta: boolean = false;
  nuevaIntencion: string = '';
  usuario: Usuario | null = null;
  acciones: Action[] = [];
  topology: any = null; // Variable para almacenar los datos del endpoint

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private actionService: ActionService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.currentUserName.subscribe(userName => {
      if (userName) {
        this.usuarioService.getUserByEmail(userName).subscribe(user => {
          if (user) {
            this.usuario = user;
            this.acciones = user.actions ?? []; // Asegúrate de que acciones sea un array
          } else {
            console.error('Usuario no encontrado');
          }
        });
      }
    });

    // Obtener los datos del endpoint
    this.httpClient.get('http://localhost:3000/topology').subscribe(data => {
      this.topology = data;
    });
  }

  enviarIntencion(): void {
    if (this.nuevaIntencion && this.usuario) {
      const nuevaAccion: Action = {
        id: this.acciones.length + 1,
        description: this.nuevaIntencion,
        isValid: true // o algún valor predeterminado
      };

      this.actionService.crearAction(nuevaAccion).subscribe((action: Action) => {
        // Actualizar la lista de acciones del usuario en el frontend
        this.acciones.push(action);
        this.mostrarAlerta = true;
        this.nuevaIntencion = '';
        setTimeout(() => this.mostrarAlerta = false, 3000);

        // Actualizar la lista de acciones del usuario en la base de datos
        if (this.usuario) {
          this.usuario.actions = this.usuario.actions ?? [];
          this.usuario.actions.push(action);
          if (this.usuario.id !== undefined) {
            this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe();
          }
        }
      });
    }
  }
}
