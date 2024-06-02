export interface Action {
    id: number;
    description: string;
    isValid: boolean;
  }
export class Usuario {
    id: number | undefined;
    name: string;
    email: string;
    password: string;
    rut: string;
    role: string;
    actions: Action[] | undefined;

    constructor(name: string, email: string, password: string, rut: string, role: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.rut = rut;
        this.role = role;
    }
}

