// 1.- librerias
import { useReducer, useEffect, createContext, useContext } from 'react';

// 2.- interfaces
import { State, Dispatch } from './types';

// 3.- reducer
import { reducer, initialState } from './reducer';

// 4.- context
import { GlobalContext } from '../../context/GlobalProvider';

// 5.- service
import { orders } from '../../service/orders';
import { customer } from '../../service/customer';

// 6.- utils
import { alert } from '../../helpers/utils';

interface OrderBoxContextInterface {
    state: State,
    dispatch: Dispatch,
}

export const OrderBoxContext = createContext<OrderBoxContextInterface>(
	{} as OrderBoxContextInterface
);

interface Props {
    children: JSX.Element | JSX.Element[];
}

function OrderBoxProvider({ children }: Props): JSX.Element {

    const { state:{ client }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [state, dispatch] = useReducer(reducer, initialState);

	// Obtener horarios
	useEffect(() => {
		
		async function callAPI(): Promise<void> {
			
			dispatchGlobal({ type: 'IS_LOADING', payload: true });
			
			const result = await orders.getSchedule();

			if (result.status !== 200 || result.data === null)
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

			dispatch({ type: 'SCHEDULE', payload: result.data });
		}

		void callAPI();

	}, []);

	// Obtener direcciones
	useEffect(() => {
	
		async function callAPI(): Promise<void> {
			
			dispatchGlobal({ type: 'IS_LOADING', payload: true });
			
			const result = await customer.getAddress(client.codigo);

			dispatch({ type: 'IS_RESUMEN', payload: true });

			if (result.status !== 200 || result.data === null)
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

			dispatch({ type: 'DIRECTIONS', payload: result.data });
		}

		void callAPI();

	}, []);

	return (
		<OrderBoxContext.Provider value={{
            state,
            dispatch
        }}>
			{ children }
		</OrderBoxContext.Provider>
	);
}

export default OrderBoxProvider;