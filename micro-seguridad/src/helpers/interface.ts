interface IUser {
    apellidos: string;
    cargo: { idCargo: number; nombre: string; };
    correo: string;
    documentoidentidad: string;
    expiracion: Date;
    idUsuario: number;
    nombres: string;
    rol: { idRol: number; nombre: string; };
    telefono: string;
    token: string;
    validatetelefono: number;
}

export type User = Readonly<IUser>;

interface ISecurityParameters {
    id: number;
    namerule: string;
    valor: string;
}

export type SecurityParameters = Readonly<ISecurityParameters>;