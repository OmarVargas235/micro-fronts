interface IUser {
    apellidos: string;
    cargo: { idCargo: number; nombre: string; };
    correo: string;
    documentoidentidad: string;
    idUsuario: number;
    nombres: string;
    rol: { idRol: number; nombre: string; };
    telefono: string;
    token: string;
    validatetelefono: number;
}

export type User = Readonly<IUser>;

interface IDataUserTable {
    apellidos: string;
    cargo: string;
    correo: string;
    documentoidentidad: string;
    estado: string;
    idcargo: number;
    idestado: number;
    idrol: number;
    idusuario: number;
    nombres: string;
    rolnombre: string;
    tipodocumento: number;
}

export type DataUserTable = Readonly<IDataUserTable>;

interface IUserSelect {
    id: number;
    nombre: string;
}

export type UserSelect = Readonly<IUserSelect>;

interface ISecurityParameters {
    id: number;
    namerule: string;
    valor: string;
}

export type SecurityParameters = Readonly<ISecurityParameters>;