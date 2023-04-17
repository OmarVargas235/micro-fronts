// 1.- Librerias

// 2.- components
import ConfigUserPage from '../components/ConfigUserPage';

// 3.- services
import { auth } from '../../../service/auth';

const ConfigUser = (): JSX.Element => {

    const logout = (): void => {

        auth.logout();
        window.location.href = '/login';
    }

    return <ConfigUserPage
        logout={logout}
    />
}

export default ConfigUser;