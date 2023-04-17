// 1.- librerias
import { useEffect, useReducer, createContext, useLayoutEffect } from 'react';

// 2.- interfaces
import { State, Dispatch } from './types';

// 3.- reducer
import { reducer, initialState } from './reducer';

// 4.- services
import { passwordParameters } from '../services/passwordParameters';

// 5.- utils
import { alert } from '../helpers/utils';

interface GlobalContextInterface {
    state: State,
    dispatch: Dispatch,
}

export const GlobalContext = createContext<GlobalContextInterface>(
	{} as GlobalContextInterface
);

interface Props {
    children: JSX.Element | JSX.Element[];
}

function GlobalProvider({ children }: Props): JSX.Element {

    const [state, dispatch] = useReducer(reducer, initialState);

    useLayoutEffect(() => {

        const body = document.querySelector('body');
        const tagLoader = document.querySelector('#loader-container');

        if (tagLoader === null || body === null) return;
        
        body.removeChild(tagLoader);

    }, []);

    // Obtener parametros de contraseña
	useEffect(() => {

		dispatch({ type: 'IS_LOADING', payload: true });

		passwordParameters.getParameters()
			.then(resp => {

				if (resp.status !== 200 || resp.data === null) {

					return alert({ dispatch, isAlertSuccess: false, message: resp.message });
				}

				dispatch({ type: 'SECURITY_PARAMETERS', payload: resp.data });
			})
			.catch(err => console.log(err))
			.finally(() => dispatch({ type: 'IS_LOADING', payload: false }));

	}, []);

	return (
		<GlobalContext.Provider value={{
            state,
            dispatch
        }}>
			{ children }
		</GlobalContext.Provider>
	);
}

export default GlobalProvider;