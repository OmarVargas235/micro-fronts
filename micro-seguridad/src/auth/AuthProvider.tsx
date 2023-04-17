// 1.- librerias
import { useState, createContext, useEffect, useContext, useCallback } from 'react';

// 2.- componentes
import Loader from '../layauts/spinner/Spinner';

// 3.- interfaces
import { Response } from '../services/interfaces';
import { User, SecurityParameters } from '../helpers/interface';
import { Props, SubmitLogin } from './interfaces';

// 4.- utils
import { rootsPublic } from '../root.component';
import { defaultuser, IDS_ROLES, alert } from '../helpers/utils';
import { expireSesion } from '../layauts/alert/Alert';

// 5.- services
import { auth, Event } from '../services/auth';

// 6.- context
import { GlobalContext } from '../context/GlobalProvider';

export interface AuthContextInterface {
	submitLogin: ({ email, password }: SubmitLogin) => Promise<Response<User>>;
}

export const AuthContext = createContext<AuthContextInterface>(
	{} as AuthContextInterface
);

function AuthProvider({ children }: Props): JSX.Element {

	const { state:{ parametersPassword, user, countPassword }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [loading, setLoading] = useState<boolean>(true);
	
	useEffect((): void => {

		Promise.all([
			jwtCheck(parametersPassword),
		]).finally(() => setLoading(false));

	}, [parametersPassword]);

	// Si el tiempo del token expira deslogearlo automaticamente.
	useEffect(() => {

		const { pathname } = window.location;
		const token = auth.getAccessToken();

		if (rootsPublic.includes(pathname) || token.length === 0) return;

		const expiracion = new Date(user.expiracion).getTime();
		const currentTime = new Date().getTime();
		const time = expiracion - currentTime;

		function closeSesion(): void {

			const isAuth = auth.isAuthTokenValid(token);
			!isAuth && alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: expireSesion });
		}

		const timeout = window.setTimeout(closeSesion, time);

		return () => window.clearTimeout(timeout);

	}, [auth]);

	const validateMaxAttempts = (): boolean => {

		const [, , , , , , , , maxAttempts] = parametersPassword;

		const isMaxAttempts = countPassword > Number(maxAttempts.valor);

		isMaxAttempts && alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: `Maximo de numero de intentos ${maxAttempts.valor}` });

		return isMaxAttempts;
	}

	const jwtCheck = useCallback(async (parametersPassword: SecurityParameters[]): Promise<void> => {

		return await new Promise(resolve => {

			auth.init();

			const event: Event = auth.getEvent();
			const { pathname } = window.location;

			if (event === 'onAutoLogin') {

				if (parametersPassword[0].valor.length === 0) return;

				const user: User = JSON.parse(window.localStorage.getItem('user') ?? defaultuser);
				const isAdmin = user.cargo.idCargo === IDS_ROLES.admin;
				const [, , , , milliseconds, , , , ] = parametersPassword;
				const currentDateMilliseconds = new Date().getTime() > Number(milliseconds.valor);

				if (currentDateMilliseconds && !isAdmin) {

					auth.logout();

					return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'Debes de actualizar la contraseña' });
				}

				rootsPublic.includes(pathname) && (window.location.href = isAdmin ? '/admin' : '/home');

				auth.signInWithToken();
				resolve();

			} else if (event === 'onAutoLogout') {

				!rootsPublic.slice(1).includes(pathname) && (window.location.href = '/login');
				resolve();

			} else if (event === 'onNoAccessToken') {

				!rootsPublic.slice(1).includes(pathname) && (window.location.href = '/login');
				resolve();
			}
		});

	}, []);

	const submitLogin =
		async ({ email, password }: SubmitLogin): Promise<Response<User>> => {

			return await auth
				.signIn(email, password)
				.then((data) => {

					const isAdmin = data.data?.cargo.idCargo === IDS_ROLES.admin;

					if (validateMaxAttempts() && !isAdmin) return { status: 201, data: null, message: '' };

					void jwtCheck(parametersPassword);

					return data;
				})
				.catch((err) => {

					return err;
				});
		};

	return (
		<AuthContext.Provider
			value={{
				submitLogin,
			}}>
			{loading ? <Loader isLoading={true} /> : children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;