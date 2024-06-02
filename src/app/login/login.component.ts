import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public MyForm: FormGroup = new FormGroup({});
  loginError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  public crearUsuario() {
    if (this.MyForm.valid) {
      const email = this.MyForm.value.correo;
      const password = this.MyForm.value.contrasena;

      this.usuarioService.authenticate(email, password).subscribe({
        next: (user: Usuario | null) => {
          if (user) {
            console.log(user)
            this.authService.login(user.name, user.role); // Pasar el nombre de usuario y el rol al AuthService
            this.router.navigate(['Home']);
          } else {
            this.loginError = 'Correo o contraseña incorrectos';
          }
        },
        error: (error) => {
          this.loginError = 'Error al intentar iniciar sesión';
          console.error('Error al autenticar:', error);
        }
      });
    }
  }

  crearFormulario() {
    this.MyForm = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
}
