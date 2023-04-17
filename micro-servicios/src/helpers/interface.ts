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

interface ICustomer {
    codigo: string;
    codigotipopago: string;
    descuento: string;
    direccion: string;
    estado: string;
    isTop: boolean;
    lineacredito: number;
    montominimo: number;
    nombrecomercial: string;
    razonsocial: string;
    ruc: string;
    tipo: string;
    tipopago: string;
    tipopagofactor: number;
}

interface IUserSelect {
    id: number;
    nombre: string;
}

export interface Product {
    price: number;
    count: number;
    name: string;
    presentation: string;
    id: number;
    stock: number;
    priceProduct: number;
    code: string;
}

export type User = Readonly<IUser>;
export type DataUserTable = Readonly<IDataUserTable>;
export type UserSelect = Readonly<IUserSelect>;
export type Customer = Readonly<ICustomer>;