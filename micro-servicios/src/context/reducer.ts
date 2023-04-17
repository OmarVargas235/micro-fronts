import { Action, State } from './types';
import { defaultuser, defaultCustomer, defaultDetailOrder } from '../helpers/utils';
import { Customer, Product } from '../helpers/interface';
import { ListOrders } from '../service/interfaces';

export const initialState: State = {
    user: JSON.parse(window.localStorage.getItem('user') ?? defaultuser),
    location: JSON.parse(window.localStorage.getItem('location') ?? "[0, 0]"),
	isAlert: false,
    isAlertSuccess: false,
    messageAlert: '',
    loading: false,
    products: JSON.parse(window.localStorage.getItem('cart') ?? '{}'),
    client: JSON.parse(window.localStorage.getItem('detail-client') ?? defaultCustomer),
    detailOrder: JSON.parse(window.localStorage.getItem('detail-order') ?? defaultDetailOrder),
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

        case 'CART':
            
            window.localStorage.setItem('cart', JSON.stringify(payload));

            return {
                ...state,
                products: payload as Record<number, Product>,
            }

        case 'CLIENT':

            window.localStorage.setItem('detail-client', JSON.stringify(payload));

            return {
                ...state,
                client: payload as Customer,
            }

        case 'DETAIL_ORDER':

            window.localStorage.setItem('detail-order', JSON.stringify(payload));

            return {
                ...state,
                detailOrder: payload as ListOrders,
            }

		default: return state;
	}
}