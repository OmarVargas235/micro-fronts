// 1.- Librerias
import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// 2.- context
import AuthProvider from './auth/AuthProvider';

// 3.- context
import GlobalProvider from './context/GlobalProvider';

// 4.- Componentes
import Spinner from './layauts/spinner/Spinner';

// 5.- theme
import { theme } from "./theme/theme";

const Offline = lazy(async () => await import('./main/offline'));
const Alert = lazy(async () => await import('./layauts/alert/Alert'));
const Login = lazy(async () => await import('./main/login'));
const ResetPassword = lazy(async () => await import('./main/resetPassword'));

// ================ Agregar las rutas publicas en este array ================ //
export const rootsPublic: string[] = ['/', '/login', '/recuperar-contrasena'];

export default function Root(): JSX.Element {
    
    return <GlobalProvider>
        <Suspense fallback={<Spinner isLoading={true} />}>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <Alert />
                    <Spinner />

                    <Offline />

                    <Router>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/recuperar-contrasena' element={<ResetPassword />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </Suspense>
    </GlobalProvider>;
}