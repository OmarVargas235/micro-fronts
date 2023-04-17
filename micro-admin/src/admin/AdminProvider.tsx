// 1.- librerias
import { useReducer, useEffect, createContext, useContext } from 'react';

// 2.- interfaces
import { State, Dispatch } from './types';

// 3.- reducer
import { reducer, initialState } from './reducer';

// 4.- servicios
import { users } from '../services/admin';
import { passwordParameters } from '../services/passwordParameters';

// 5.- context
import { GlobalContext } from '../context/GlobalProvider';

// 6.- utils
import { alert } from '../helpers/utils';

interface AdminContextInterface {
    state: State,
    dispatch: Dispatch,
}

export const AdminContext = createContext<AdminContextInterface>(
	{} as AdminContextInterface
);

interface Props {
    children: JSX.Element | JSX.Element[];
}

function AdminProvider({ children }: Props): JSX.Element {

    const { dispatch:dispatchGlobal } = useContext(GlobalContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        dispatchGlobal({ type: 'IS_LOADING', payload: true });

        users.getUsers()
            .then(resp => {
                
                if (resp.status !== 200 || resp.data === null)
                    return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: resp.message });

                dispatch({ type: 'DATA_USERS_TABLE', payload: resp.data });
            })
            .catch(err => {

                console.log(err);
            })
            .finally(() => dispatchGlobal({ type: 'IS_LOADING', payload: false }));

    }, [state.updateDataTable]);

	// Obtener parametros de contraseña
	useEffect(() => {

		dispatchGlobal({ type: 'IS_LOADING', payload: true });

		passwordParameters.getParameters()
			.then(resp => {

				if (resp.status !== 200 || resp.data === null) {

					return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: resp.message });
				}

				dispatch({ type: 'SECURITY_PARAMETERS', payload: resp.data });
			})
			.catch(err => console.log(err))
			.finally(() => dispatchGlobal({ type: 'IS_LOADING', payload: false }));

	}, [state.isUserManagement]);

	return (
		<AdminContext.Provider value={{
            state,
            dispatch
        }}>
			{ children }
		</AdminContext.Provider>
	);
}

export default AdminProvider;