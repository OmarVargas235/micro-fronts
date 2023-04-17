# COMO USAR EL HOOK

```sh
import { useWindowDimensions } from 'hooks/windowDimensions/useWindowDimensions';

const Component = (): JSX.Element => {

    const { width } = useWindowDimensions();
    
    return <>
        { width <= 375 ? null : <div className='col-1'>Se cumple la condicion</div> }
    </>
}
```