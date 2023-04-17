// 1.- librerias

// 2.- componentes
import AdminPage from './container/Admin';

// 3.- context
import AdminProvider from './AdminProvider';

const Admin = (): JSX.Element => {

    return <AdminProvider>
        <AdminPage />
    </AdminProvider>
}

export default Admin;