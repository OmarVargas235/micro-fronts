// 1.- librerias
import { useState, useContext } from 'react';

// 2.- componentes
import AdminPage from '../components/AdminPage';

// 3.- context
import { AdminContext } from '../AdminProvider';
import { GlobalContext } from '../../context/GlobalProvider';

// 4.- services
import { users } from '../../services/admin';

// 5.- utils
import { alert } from '../../helpers/utils';

const Admin = (): JSX.Element => {

    const { dispatch:dispatchGlobal } = useContext(GlobalContext);
    const { state, dispatch } = useContext(AdminContext);

    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [idUser, setIdUser] = useState<number>(-1);

    const refresh = (): void => window.location.reload();

    const addUser = (): void => {

        setIsOpen(true);
        dispatch({ type: 'IS_EDIT', payload: false });
    }

    const deleteUser = async (id: number, isDelete: boolean = false): Promise<void> => {
        
        setIsOpenModalDelete(true);
        setIdUser(id);

        if (isDelete) {

            dispatchGlobal({ type: 'IS_LOADING', payload: true });

            const result = await users.deleteUser(id);

            dispatchGlobal({ type: 'IS_LOADING', payload: false });

            setIsOpenModalDelete(false);

            if (result.status !== 200)
                return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

            alert({ dispatch: dispatchGlobal, isAlertSuccess: true, message: result.message });

            dispatch({ type: 'UPDATE_DATA_TABLE', payload: !state.updateDataTable })
        }
    }

    return <AdminPage
        refresh={refresh}
        addUser={addUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteUser={deleteUser}
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        idUser={idUser}
    />
}

export default Admin;