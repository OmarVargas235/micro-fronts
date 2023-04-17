import { Action } from '../context/types';
import { DeatilProduct } from '../service/interfaces';

interface Alert {
    dispatch: (v: Action) => void;
    isAlertSuccess: boolean;
    message: string;
}

interface FormatDecimals {
    n: number;
    symbol?: string;
    nDecimals?: number;
}

export enum IDS_ROLES {
    ejecutivo = 1,
    admin = 2
}

export const validatePassword = (password: string): boolean => {

    return (/^(?=(?:.*[¿?¡!|&-_]){2})(?=(?:.*\d){2})(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})/g).test(password);
}

export const validateEmail = (email: string): boolean => {

    return (/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i).test(email);
}

export const defaultuser = JSON.stringify({
    apellidos: '',
    cargo: { idCargo: -1, nombre: '' },
    correo: '',
    documentoidentidad: '',
    idUsuario: -1,
    nombres: '',
    rol: { idRol: -1, nombre: '' },
    telefono: '',
    token: '',
    validatetelefono: -1,
});

export const defaultCustomer = JSON.stringify({
    codigo: '',
    razonsocial: '',
    nombrecomercial: '',
    ruc: '',
    direccion: '',
    tipo: '',
    lineacredito: 0,
    estado: '',
    descuento: '',
    tipopago: '',
    codigotipopago: '',
});

export const defaultValue: DeatilProduct = {
	categoria: '', codigo: '', descuentos: [],
	forma: '', idCategoria: '', idForma: '',
	idProducto: 0, idStock: 0, nombre: '',
	precio: 0, presentacion: '', registro: '',
	stock: 0, uMedida: '', descuento: 0, descuentoPorcentaje: 0
}

export const defaultDetailOrder = JSON.stringify({
    cliente_codigo: '',
    cliente_credito: 0,
    cliente_nombre_comercial: '',
    cliente_ruc: '',
    dias_mora: 0,
    estado_comercial: '',
    estado_comercial_abrev: '',
    estado_roxfarma: "",
    estado_roxfarma_abrev: "PE",
    fecha_entrega: '',
    fecha_pedido: '',
    fecha_vencimiento: '',
    n_plazo: 0,
    numped: '',
    observacion: '',
    observacion_abrev: "CR",
    pedidowap: '',
    valor_igv: 0,
    valor_total: 0,
});

export const alert = ({ dispatch, isAlertSuccess, message }: Alert): void => {

    dispatch({ type: 'IS_ALERT', payload: true });
    dispatch({ type: 'IS_ALERT_SUCCESS', payload: isAlertSuccess });
    dispatch({ type: 'MESSAGE_ALERT', payload: message });
}

export const formatDecimals = ({ n, symbol="S/", nDecimals= 2 }: FormatDecimals): string => {

    const nString = n.toString().replaceAll(',', '.');

    const integer = Number.isInteger( Number(nString) ) ? nString : nString.split('.')[0];
    const decimals = parseFloat(nString).toFixed(nDecimals).split('.')[1] ?? '0'.repeat(nDecimals);
    
    if (integer.length < 4) return `${symbol} ${integer}.${decimals}`;

    const countDecimalPoints = integer.length / 3;
    const nDecimalPoints = Number.isInteger(countDecimalPoints)
    ? countDecimalPoints - 1 : Math.floor(countDecimalPoints);
    
    let position = 0;
    let numberDecimalPoints = '';

    for (let i = 0; i < nDecimalPoints; i++) {

        position = i === 0 ? (integer.length - 3) : position-3;
        const decimalPoint = integer.slice(0, position) + "," + integer.slice(position);
        const lastPosition = i+1 === nDecimalPoints;
        
        numberDecimalPoints = `,${decimalPoint.split(",")[1].slice(0, 3)}${numberDecimalPoints}`;
        lastPosition && (numberDecimalPoints = `${integer.slice(0, position)}${numberDecimalPoints}`);
    }

    numberDecimalPoints += `.${decimals}`;

    return `${symbol} ${numberDecimalPoints}`;
}

export const roundDecimals = (n: number, decimals: number): number => Number(parseFloat(n.toString()).toFixed(decimals));

export const deleteMap = <T extends Record<string, unknown> | ArrayLike<unknown>>(data: T, id: number): T => {

    const mapData = new Map(Object.entries(data));

    id in data && mapData.delete(id.toString());

    const objectData = Object.fromEntries(mapData) as unknown as T;

    return objectData;
}