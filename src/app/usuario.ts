export class Usuario {
    name: string;
    email: string;
    password: string;
    rut: string;
    role: string;

    constructor(name: string, email: string, password: string, rut: string, role: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.rut = rut;
        this.role = role;
    }
}

