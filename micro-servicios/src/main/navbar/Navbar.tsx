// 1.- Librerias
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// 2.- iconos
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

// 3.- estilos
import { Container } from './styled';

// 4.- context
import { GlobalContext } from '../../context/GlobalProvider';

// 5.- utils
import { IDS_ROLES } from '../../helpers/utils';

// 6.- theme
import { theme } from '../../theme/theme';

const Navbar = (): JSX.Element => {

    const { state:{ user } } = useContext(GlobalContext);

    const history = useNavigate();
    const { pathname } = useLocation();
    
    const [color, setColor] = useState<{
        home: string;
        config: string;
    }>({
        home: theme.colors.color1,
        config: theme.colors.color1
    });

    useEffect(() => {

        pathname === '/home' && setColor({ home: theme.colors.color3, config: theme.colors.color1 });

        pathname === '/home' && setColor({ home: theme.colors.color3, config: theme.colors.color1 });
        pathname === '/configuracion' && setColor({ home: theme.colors.color1, config: theme.colors.color3 });

        (pathname !== '/home' && pathname !== '/configuracion') && setColor({ home: theme.colors.color1, config: theme.colors.color1 });

    }, [pathname]);

    return <Container className='d-flex justify-content-center w-100 py-2'>
        <BiHomeAlt
            className='pointer'
            size={30}
            color={color.home}
            onClick={() => history('/home')}
        />

        <BiUser
            className='pointer mx-4'
            size={30}
            color={color.config}
            onClick={() => history('/configuracion')}
        />

        {
            user.cargo.idCargo === IDS_ROLES.admin
            ? <BsGear
                className='pointer'
                color={theme.colors.color1}
                size={30}
                onClick={() => (window.location.href = '/admin')}
            /> : null
        }
    </Container>
}

export default Navbar;