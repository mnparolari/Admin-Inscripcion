export interface User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    userType: 'Administrador' | 'Usuario';
    img: string,
    token: string;
}