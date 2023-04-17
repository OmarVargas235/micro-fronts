// 1.- Librerias
import { useContext } from 'react';

// 2.- components
import { Text } from '../../../layauts/Text';
import Avatar from '../../../layauts/Avatar';

// 3.- estilos
import { Container } from '../styled';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- iconos
import { HiArrowRightOnRectangle } from "react-icons/hi2";

// 6.- utils
import { options } from '../utils';

interface Props {
    logout: () => void;
}

const ConfigUserPage = ({ logout }: Props): JSX.Element => {

    const { state:{ user } } = useContext(GlobalContext);

    return <Container className='p-5'>
        <Text
            color='#10164C'
            size='18px'
            weight='bold'
        >Mi perfil</Text>
        
        <div className='d-flex align-items-center mt-4 mb-5'>
            <Avatar>{user.nombres.charAt(0)}{user.apellidos.charAt(0)}</Avatar>

            <Text
                color='#090F47'
                size='20px'
                weight='bold'
                className='ml-3'
            >{user.nombres} {user.apellidos}</Text>
        </div>

        {
            options(user).map((v, index) => (
                <div className='d-flex align-items-center divider pb-3 mb-2' key={index}>
                    { v.icon }

                    <Text color='#090F47' className='ml-2'>{v.text}</Text>
                </div>
            ))
        }

        <div className='d-flex align-items-center'>
            <HiArrowRightOnRectangle
                color='#090F47'
                size={30}
                onClick={logout}
                className='pointer'
                style={{ transform: 'rotateZ(180deg)' }}
            />

            <Text
                color='#090F47'
                className='ml-2 pointer'
                onClick={logout}
            >Cerrar Sesión</Text>
        </div>
    </Container>
}

export default ConfigUserPage;