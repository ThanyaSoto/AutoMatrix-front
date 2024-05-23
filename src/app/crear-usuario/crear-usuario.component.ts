import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  public MyForm: FormGroup = new FormGroup({});

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  rut: string = '';
  rol: string = '';
  usuario:Usuario = new Usuario(this.nombre,this.correo,this.contrasena,this.rut,this.rol)

  constructor(private router: Router,private usuarioService:UsuarioService) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  public crearUsuario(): void {
    if (this.MyForm.valid) {
      this.usuario.name=this.MyForm.get('nombre')?.value;
      this.usuario.email=this.MyForm.get('correo')?.value;
      this.usuario.password=this.MyForm.get('contrasena')?.value;
      this.usuario.rut=this.MyForm.get('rut')?.value;
      this.usuario.role=this.MyForm.get('rol')?.value;
      this.usuarioService.crearUsuario(this.usuario).subscribe(dato=>{
      this.router.navigate(['Home']);
      }
    )
    }
  }

  crearFormulario(): void {
    this.MyForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(4)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      rut: new FormControl('', [Validators.required, Validators.minLength(9), this.rutValidator()]),
      rol: new FormControl('Admin', Validators.required)
    });
  }

  private rutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      if (!rut) {
        return null;
      }
      const valid = this.validateRut(rut);
      return valid ? null : { rutInvalid: true };
    };
  }

  private validateRut(rut: string): boolean {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    if (rut.length < 9) {
      return false;
    }
    
    const dv = rut.slice(-1).toUpperCase();
    const rutWithoutDv = rut.slice(0, -1);
    
    let total = 0;
    let factor = 2;
    
    for (let i = rutWithoutDv.length - 1; i >= 0; i--) {
      total += +rutWithoutDv[i] * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    const dvCalc = 11 - (total % 11);
    let dvStr = dvCalc === 11 ? '0' : dvCalc === 10 ? 'K' : dvCalc.toString();
    return dv === dvStr;
  }
}
