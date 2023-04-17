// 1.- librerias
import { useContext } from 'react';

// 2.- componentes
import { Text } from '../../layauts/Text';
import Avatar from '../../layauts/Avatar';

// 3.- iconos
import { IoMdArrowDropdown } from "react-icons/io";

// 4.- estilos
import { ModalSesion } from '../styled';

// 5.- context
import { GlobalContext } from '../../context/GlobalProvider';

interface Props {
    isUserManagement: boolean;
    isOpen: boolean;
    setIsOpen: (v: (state: boolean) => boolean) => void;
    logout: () => void;
}

const HeaderPage = ({ isUserManagement, isOpen, setIsOpen, logout }: Props): JSX.Element => {

    const { state:{ user } } = useContext(GlobalContext);

    return <div className='d-flex justify-content-between'>
        <Text
            color='#006299'
            size='30px'
            weight='bold'
        >{isUserManagement ? 'Gestión de usuarios' : 'Parametros contraseña'}</Text>

        <div className='d-flex justify-content-around align-items-center'>
            <Avatar>{user.nombres.charAt(0)}{user.apellidos.charAt(0)}</Avatar>

            <Text
                weight='bold'
                color='#0E0E0E'
                className='text-center mx-1'
            >{user.nombres} {user.apellidos}</Text>

            <div className='position-relative mt-2' id='closeSesion'>
                <IoMdArrowDropdown
                    size={25}
                    className='pointer'
                    onClick={() => setIsOpen((state: boolean) => !state)}
                    id='closeSesion'
                />

                {
                    isOpen ? <ModalSesion
                        className='position-absolute p-3 text-center'
                        id='closeSesion'
                    >
                        <Text
                            className='pointer hover'
                            id='closeSesion'
                            onClick={logout}
                        >Cerrar Sesión</Text>
                    </ModalSesion> : null
                }
            </div>
        </div>
    </div>
}

export default HeaderPage;