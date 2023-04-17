// 1.- librerias
import { useReducer, createContext } from 'react';

// 2.- interfaces
import { State, Dispatch } from './types';

// 3.- reducer
import { reducer, initialState } from './reducer';

interface NewOrdersDetailContextInterface {
    state: State,
    dispatch: Dispatch,
}

export const NewOrdersDetailContext = createContext<NewOrdersDetailContextInterface>(
	{} as NewOrdersDetailContextInterface
);

interface Props {
    children: JSX.Element | JSX.Element[];
}

function NewOrdersDetailProvider({ children }: Props): JSX.Element {

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<NewOrdersDetailContext.Provider value={{
            state,
            dispatch
        }}>
			{ children }
		</NewOrdersDetailContext.Provider>
	);
}

export default NewOrdersDetailProvider;