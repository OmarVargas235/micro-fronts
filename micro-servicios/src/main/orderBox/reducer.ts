import { Action, State, Summary } from './types';
import { Direction, Schedule } from '../../service/interfaces';
import { BodyRegister } from '../../service/orders';

export const initialState: State = {
	countProduct: 0,
	total: 0,
	direction: '',
	schedule: [],
	directions: [],
	body: {
		codigo_cliente: '', condicion: '', direccion_cliente: '',
		fecha_entrega: '', horario_atencion: '', latitud: 0,
		lista_producto: [], longitud: 0, tipo_pago: '',
		tipo_usuario: '', id_borrador: '', observacion: '',
	},
	summary: {
		discountClient: 0, discountProduct: 0, igv: 0,
		deadline: '', officeHours: '', observation: '',
	},
	isResumeOrder: false,
};

export function reducer(state:State = initialState, { type, payload }: Action): State {

	switch (type) {

		case 'COUNT_PRODUCT':
			return {
				...state,
				countProduct: payload as number,
			}

		case 'TOTAL':
			return {
				...state,
				total: payload as number,
			}

		case 'DIRECTION':
			return {
				...state,
				direction: payload as string,
			}

		case 'SCHEDULE':
			return {
				...state,
				schedule: payload as Schedule[],
			}

		case 'DIRECTIONS':
			return {
				...state,
				directions: payload as Direction[],
			}

		case 'BODY':
			return {
				...state,
				body: payload as BodyRegister,
			}

		case 'SUMMARY':
			return {
				...state,
				summary: payload as Summary,
			}

		case 'IS_RESUMEN':
			return {
				...state,
				isResumeOrder: payload as boolean,
			}

		default: return state;
	}
}