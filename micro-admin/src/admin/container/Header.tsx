// 1.- librerias
import { useState, useLayoutEffect } from 'react';

// 2.- componentes
import HeaderPage from '../components/HeaderPage';

// 3.- services
import { auth } from '../../services/auth';

interface Props {
    isUserManagement: boolean;
}

const Header = ({ isUserManagement }: Props): JSX.Element => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useLayoutEffect(() => {
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('click', (e: any) => {

			if (e.path[0].getAttribute('id') !== 'closeSesion' && e.path[0].getAttribute('d') === null)
                setIsOpen(false);
		});
		
		return () => {
            
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			window.removeEventListener('click', (e: any) => {
            
                if (e.path[0].getAttribute('id') !== 'closeSesion' && e.path[0].getAttribute('d') === null)
                    setIsOpen(false);
            });
		}

    }, []);

    const logout = (): void => {

        auth.logout();

        window.location.href = '/login';
    }

    return <HeaderPage
        isUserManagement={isUserManagement}
        logout={logout}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
    />
}

export default Header;