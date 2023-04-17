import { useState, useEffect, useLayoutEffect, useCallback } from 'react';

export const useMediaQuery = (breakpoint:string):boolean => {

    const [isCorrectBreakpoint, setIsCorrectBreakpoint] = useState<boolean>(true);
    const [isMatches, setIsMatches] = useState<boolean>(false);

    const getMatche = useCallback((isMinWidth:boolean):void => {

        const resolution:RegExpMatchArray | null = breakpoint.match(/[0-9]+/g);

        if (resolution === null) return;

        const [number] = resolution;
        const { innerWidth } = window;

        const matches = isMinWidth ? (innerWidth > Number(number)) : (innerWidth < Number(number))
        setIsMatches(matches);

    }, [breakpoint]);

    useEffect(() => {
        
        const isMinWidth:boolean = (/\(min-width:\s?[0-9]+px\)/gi).test(breakpoint);
        const isMaxWidth:boolean = (/\(max-width:\s?[0-9]+px\)/gi).test(breakpoint);

        (!isMinWidth && !isMaxWidth) && setIsCorrectBreakpoint(false);

        if ( !isMinWidth && !isMaxWidth ) return console.error('breakpoint incorrecto');

        getMatche(isMinWidth);

    }, [breakpoint, getMatche]);

    useLayoutEffect(() => {

        if (!isCorrectBreakpoint) return console.error('breakpoint incorrecto');

        function updateSize(): void {

            const isMinWidth:boolean = (/min-width/gi).test(breakpoint);
            getMatche(isMinWidth);
        }
    
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);

    }, [isCorrectBreakpoint, breakpoint, getMatche]);

    return isMatches;
}