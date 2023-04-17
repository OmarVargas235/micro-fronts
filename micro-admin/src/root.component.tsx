// 1.- Librerias
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

// 2.- interfaces
import { User } from "./helpers/interface";

// 3.- servicios
import { auth } from './services/auth';

// 4.- context
import GlobalProvider from './context/GlobalProvider';

// 5.- utils
import { IDS_ROLES, defaultuser } from './helpers/utils';

// 6.- Componentes
import Alert from './layauts/alert/Alert';
import Spinner from './layauts/spinner/Spinner';

// 7.- theme
import { theme } from "./theme/theme";

const Admin = lazy(async () => await import('./admin'));

const user: User = JSON.parse(window.localStorage.getItem('user') ?? defaultuser);

export default function Root(): JSX.Element {

	useEffect(() => auth.signInWithToken(), []);

	useEffect(() => {

		if (IDS_ROLES.admin !== user.cargo.idCargo) window.location.href = '/home';

	}, []);

	return <Suspense fallback={<Spinner isLoading={true} />}>
		<GlobalProvider>
			<ThemeProvider theme={theme}>
				<Alert />
				<Spinner />

				<Router>
					<Routes>
						<Route path='/admin' element={<Admin />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</GlobalProvider>
	</Suspense>
}
