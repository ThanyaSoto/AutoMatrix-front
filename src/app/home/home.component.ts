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
    this.authService.currentUserName.subscribe(username => {
      console.log(username);
      if (username) {
        this.usuarioService.getUserByUsername(username).subscribe(user => {
          console.log("user: " + user);
          if (user) {
            this.usuario = user;
            this.acciones = user.actions ?? [];
          } else {
            console.error('Usuario no encontrado');
          }
        });
      }
    });
    this.httpClient.get('http://localhost:3000/topology').subscribe(data => {
      this.topology = data;
    });
  }

  enviarIntencion(): void {
    console.log("intencion " + this.nuevaIntencion);

    if (this.nuevaIntencion && this.usuario) {
      
      const nuevaAccion: Partial<Action> = {
        description: this.nuevaIntencion,
        isValid:false
      };

      if (this.usuario.id !== undefined) {
        console.log("usuario " + this.usuario.id);
        this.actionService.crearAction(nuevaAccion, this.usuario.id).subscribe((action: Action) => {
          this.acciones.push(action);
          this.mostrarAlerta = true;
          this.nuevaIntencion = '';
          setTimeout(() => this.mostrarAlerta = false, 3000);

          // Actualizar la lista de acciones del usuario en la base de datos
          /*if (this.usuario) {
            this.usuario.actions = this.usuario.actions ?? [];
            this.usuario.actions.push(action);
            if (this.usuario.id !== undefined) {
              console.log("id" + this.usuario.id);
              console.log("usuario" + this.usuario);
              this.usuarioService.actualizarUsuario(this.usuario.id, this.usuario).subscribe();
            }
          }*/
        });
      } else {
        console.error('El usuario no tiene un ID definido.');
      }
    }
  }
}
