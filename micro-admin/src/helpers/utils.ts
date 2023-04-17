import { Action } from '../context/types';
import { SecurityParameters } from './interface';

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

export const validatePassword = (password: string='', values: SecurityParameters[]): boolean => {

    const [minlength, minCapitalization, minLower, minSymbols, , minNums] = values;

    const regex = new RegExp(`^(?=(?:.*[@¿?¡!&-]){${minSymbols.valor}})(?=(?:.*[A-Z]){${minCapitalization.valor}})(?=(?:.*[a-z]){${minLower.valor}})(?=(?:.*[0-9]){${minNums.valor}})`);

    return regex.test(password) && password.length >= Number(minlength.valor);
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