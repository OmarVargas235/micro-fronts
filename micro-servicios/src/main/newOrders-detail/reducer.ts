import { Action, State } from './types';

export const initialState: State = {
	code: "",
};

export function reducer(state:State = initialState, { type, payload }: Action): State {

	switch (type) {

		case 'CODE_PRODUCT':
			return {
				...state,
				code: payload as string,
			}

		default: return state;
	}
}