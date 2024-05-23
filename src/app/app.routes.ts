import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home',component: HomeComponent},
    {path: 'login',component: LoginComponent},
    {path: 'crearUsuario',component: CrearUsuarioComponent},
    
];