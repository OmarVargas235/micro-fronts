import { DataUserTable, SecurityParameters } from '../helpers/interface';
import { Action, State } from './types';

const defaultValue: DataUserTable = {
    apellidos: "", cargo: "", correo: "",
    documentoidentidad: "", estado: "", idcargo: -1,
    idestado: -1, idrol: -1, idusuario: -1,
    nombres: "", rolnombre: "", tipodocumento: -1,
}

export const initialState: State = {
	dataUsers: [],
	parametersPassword: [],
	userEdit: defaultValue,
	isEdit: false,
	updateDataTable: false,
	isUserManagement: true,
};

export function reducer(state:State = initialState, { type, payload }: Action): State {

	switch (type) {

		case 'DATA_USERS_TABLE':
			return {
				...state,
				dataUsers: payload as DataUserTable[],
			}

		case 'SECURITY_PARAMETERS':
			return {
				...state,
				parametersPassword: payload as SecurityParameters[],
			}

		case 'DATA_USER_EDIT':
			return {
				...state,
				userEdit: payload as DataUserTable,
			}

		case 'IS_EDIT':
			return {
				...state,
				isEdit: payload as boolean,
			}

		case 'UPDATE_DATA_TABLE':
			return {
				...state,
				updateDataTable: payload as boolean,
			}

		case 'IS_USER_MANAGEMENT':
			return {
				...state,
				isUserManagement: payload as boolean,
			}

		default: return state;
	}
}