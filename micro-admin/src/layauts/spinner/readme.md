# COMO USAR EL COMPONENTE

## Spinner global

```sh
import { useEffect, useContext } from 'react';
import Spinner from 'layauts/spinner/Spinner';
import { GlobalContext } from 'context/GlobalProvider';

const Component = (): JSX.Element => {

    const { dispatch:dispatchGlobal } = useContext(GlobalContext);

    useEffect(() => {

		const callAPI = async (): void => {

            dispatchGlobal({ type: 'IS_LOADING', payload: true });
		
            const result = await service.buscar({...});

            dispatchGlobal({ type: 'IS_LOADING', payload: false });
        }

        void callAPI();

	}, []);

    
    return <Spinner />;
}
```

## Spinner local

```sh
import Spinner from 'layauts/spinner/Spinner';

const Component = (): JSX.Element => {
    
    return <Spinner isLoading={true} />;
}
```

## Props esquema

Props
-------

|  params   |       required           |    type   |
| --------- | :----------------------: | :-------: |
| isLoading | :heavy_multiplication_x: | `boolean` |