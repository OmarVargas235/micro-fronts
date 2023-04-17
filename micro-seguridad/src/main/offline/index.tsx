// 1.- librerias
import { useState, useEffect } from 'react';

// 2.- components
import OfflinePage from './components/OfflinePage';

const Offline = (): JSX.Element => {

    const [isOnline, setIsOnline] = useState<boolean>(true);

    useEffect(() => {

        window.addEventListener('online', () => setIsOnline(true));
        window.addEventListener('offline', () => setIsOnline(false));

        return () => {

            window.removeEventListener('online', () => setIsOnline(true));
            window.removeEventListener('offline', () => setIsOnline(false));
        }

    }, []);

    return <OfflinePage isOnline={isOnline} />;
}

export default Offline;