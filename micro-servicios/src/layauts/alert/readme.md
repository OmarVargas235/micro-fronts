# COMO USAR EL COMPONENTE

```sh
import { useEffect, useContext } from 'react';
import Alert from 'layauts/alert/Alert';
import { alert } from 'helpers/utils';
import { GlobalContext } from 'context/GlobalProvider';

const Component = (): JSX.Element => {

    const { dispatch:dispatchGlobal } = useContext(GlobalContext);

    useEffect(() => {

        alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: "mensaje..." });

    }, []);
    
    return <Alert />;
}
```