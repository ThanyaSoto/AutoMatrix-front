import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  public MyForm:FormGroup = new FormGroup({});
  id:number=0;
  nombre:string='';
  contrasena:string='';

  constructor(private router:Router) { }
  ngOnInit(): void {
    this.crearFormulario();
  }
  public crearUsuario(){
    if(this.MyForm.valid){

      this.router.navigate(['Home']);
    }
  }
  crearFormulario(){
    this.MyForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }
}
