import { Action, State } from './types';
import { defaultuser } from '../helpers/utils';

export const initialState: State = {
    user: JSON.parse(window.localStorage.getItem('user') ?? defaultuser),
    location: JSON.parse(window.localStorage.getItem('location') ?? "[0, 0]"),
	isAlert: false,
    isAlertSuccess: false,
    messageAlert: '',
    loading: false,
};

export function reducer(state:State = initialState, { type, payload }: Action): State {

	switch (type) {

		case 'IS_ALERT':
			return {
				...state,
				isAlert: payload as boolean,
			}
        
        case 'IS_ALERT_SUCCESS':
            return {
                ...state,
                isAlertSuccess: payload as boolean,
            }

        case 'MESSAGE_ALERT':
            return {
                ...state,
                messageAlert: payload as string,
            }

        case 'IS_LOADING':
            return {
                ...state,
                loading: payload as boolean,
            }

		default: return state;
	}
}