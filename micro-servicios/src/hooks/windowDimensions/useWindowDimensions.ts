// 1.- librerias
import { useState, useLayoutEffect } from 'react';

// 2.- interfaces
import { WindowDimensions } from './interface';

export const useWindowDimensions = (): WindowDimensions => {

    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {

        const { innerWidth: width, innerHeight: height } = window;

        setWindowDimensions({ width, height });

    }, []);

    useLayoutEffect(() => {

        const handleResize = (): void => {

            const { innerWidth: width, innerHeight: height } = window;
            setWindowDimensions({ width, height });
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return windowDimensions;
}