import { Customer } from "../helpers/interface";

const status = [200, 201, 400, 401, 403, 404, 415, 500, 502, 504] as const;

export type Status = typeof status[number];

interface IResponse<T> {
    status: Status;
    data: T | null;
    message: string;
    messages?: string;
}

interface IResponsePaginate<T> {
    status: Status;
    data: T | null;
    message: string;
    total: number;
}

interface IUserEdit {
    apellidos: string;
    documentoidentidad: string;
    email: string;
    id: number;
    idrol: number;
    idtipodocumento: number;
    nombres: string;
    password: string;
}

interface IGetCustomer {
    clientes: Customer[];
    total: number;
}

interface IDirection {
	codigo: string;
    nombre: string;
    lugar_entrega: string;
}

interface IGetCustomerBody {
    razonsocial: string;
    nombrecomercial: string;
    codigo: string;
    rowsPerPage: number;
    page: number;
}

interface IDeatilProduct {
    categoria: string;
    codigo: string;
    descuento: number;
    descuentoPorcentaje: number;
    descuentos: Array<{nombre: string; porcentaje: number}>;
    forma: string;
    idCategoria: string;
    idForma: string;
    idProducto: number;
    idStock: number;
    nombre: string;
    precio: number;
    presentacion: string;
    registro: string;
    stock: number;
    uMedida: string;
}

interface IProduct {
    codigo: string;
    idProducto: number;
    nombre: string;
    presentacion: string;
    precio: number;
    uMedida: string;
    stock: number;
}

interface IResumeOrder<T, M, N> {
    lista_bonificacion: T[];
    lista_producto: M[];
    lista_promocion: N[];
    precio_bruto: number;
    precio_descuento: number;
    precio_descuento_cliente: number;
    precio_descuento_producto: number;
    precio_igv: number;
    precio_neto: number;
}

interface ISchedule {
    cod_hora: string;
    nom_hora: string;
}

interface IListOrders {
    cliente_codigo: string;
    cliente_credito: number;
    cliente_nombre_comercial: string;
    cliente_ruc: string;
    dias_mora: number;
    en_periodo: boolean;
    estado_roxfarma: string;
    estado_roxfarma_abrev: 'AP' | 'PE' | 'RE' | 'AN' | 'BR';
    fecha_entrega: string;
    fecha_pedido: string;
    fecha_vencimiento: string;
    hora_pedido: string;
    n_plazo: number;
    numped: string;
    observacion: string;
    observacion_abrev: "CR" | "MR" | "SK" | "";
    pedidowap: string;
    valor_igv: number;
    valor_total: number;
}

interface IDetailOrder {
    cantidad_requerida: number;
    cod_articulo: string;
    descuento: number;
    id_articulo: number;
    is_bonificacion: boolean;
    is_promocion: boolean;
    nombre: string;
    precio_unitario_sin_igv: number;
    presentacion: string;
    stock: number;
    valor_igv: number;
    valor_neto: number;
}

export type Response<T> = Readonly<IResponse<T>>;
export type ResponsePaginate<T> = Readonly<IResponsePaginate<T>>;
export type UserEdit = Readonly<IUserEdit>;
export type GetCustomer = Readonly<IGetCustomer>;
export type Direction = Readonly<IDirection>;
export type GetCustomerBody = Readonly<IGetCustomerBody>;
export type DeatilProduct = Readonly<IDeatilProduct>;
export type Product = Readonly<IProduct>;
export type ResumeOrder<T, M, N> = Readonly<IResumeOrder<T, M, N>>;
export type Schedule = Readonly<ISchedule>;
export type ListOrders = Readonly<IListOrders>;
export type DetailOrder = Readonly<IDetailOrder>;