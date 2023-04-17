// 1.- librerias
import { useState, useEffect } from 'react';

export const useDebounced = (value: string, delay: number): string => {

    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {

        const handler = window.setTimeout(() => {

            setDebouncedValue(value);

        }, delay);

        return () => clearTimeout(handler);

    }, [value, delay]);

    return debouncedValue;
}