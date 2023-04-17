# COMO USAR EL HOOK

## useDebounced

```sh
import { useState, useEffect } from 'react';
import { useDebounced } from 'hooks/useDebounced';
import TextField from 'layauts/textField/TextField';
import axios, { AxiosError, AxiosResponse } from 'axios';

const Component = (): JSX.Element => {

    const [valueSearch, setValueSearch] = useState<string>('');

    const textSearchDebounced = useDebounced(valueSearch, 1000);

    useEffect(() => {

		const callAPI = async (body) => {
            
            const result = await axios
                    .get(`buscar/${textSearchDebounced}`)
                    .then(({ data:resp }: AxiosResponse) => {

                        // codigo
                    })
                    .catch(({ response }: AxiosError) => {

                        // codigo
                    });
		    });
	    }

        void callAPI();

	}, [textSearchDebounced]);

    const search = (e: ChangeEvent<HTMLInputElement>): void => {
		
		const text: string = e.target.value;
		setValueSearch(text);
	}
    
    return <>
        <TextField
            placeholder='Buscar...'
            name='search'
            handleChange={search}
            isFull={true}
            value={valueSearch}
        />
    </>
}
```

## useMediaQuery

```sh
import { useMediaQuery } from 'hooks/useMediaQuery';

const Component = (): JSX.Element => {

    const matches1 = useMediaQuery('(min-width:600px)');
    const matches2 = useMediaQuery('(max-width:600px)');
    
    return <>
        <span>{matches1 ? 'matches1' : null}</span>
        <span>{matches2 ? 'matches2' : null}</span>
    </>;
}
```