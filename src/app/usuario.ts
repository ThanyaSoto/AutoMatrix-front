export class Usuario {
    nombre: string;
    correo: string;
    contrasena: string;
    rut: string;
    rol: string;

    constructor(nombre: string, correo: string, contrasena: string, rut: string, rol: string) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.rut = rut;
        this.rol = rol;
    }
}

