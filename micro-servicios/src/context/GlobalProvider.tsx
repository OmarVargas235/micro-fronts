// 1.- librerias
import { useReducer, createContext } from 'react';

// 2.- interfaces
import { State, Dispatch } from './types';

// 3.- reducer
import { reducer, initialState } from './reducer';

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