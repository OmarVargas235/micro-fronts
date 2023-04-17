# COMO USAR EL COMPONENTE

```sh
import Animation, { timeClose } from 'animation/Animation';

let timeout: string | number | NodeJS.Timeout | undefined;

const Component = (): JSX.Element => {

    const [isClose, setIsclose] = useState<boolean>(false);

    const close = (): void => {

        clearTimeout(timeout);

        window.setTimeout(() => {

            setIsclose(false);
            dispatch({ type: 'IS_ALERT', payload: false }) ór setIsclose(false);

        }, timeClose);

        setIsclose(true);
    }

    const closeDiv = (e: MouseEvent<HTMLDivElement>): void => {
            
        const target: HTMLDivElement = e.target as HTMLDivElement;
        target.dataset.close === 'close' && close();
    }
    
    return <div
        onClick={closeDiv}
        data-close="close"
    >
        <Animation isClose={isClose}>
            <div>
                <div className='d-flex justify-content-end mb-4'>
                    <div
                        onClick={close}
                        size={25}
                        className="pointer"
                    >
                        icon
                    </div>
                </div>
            </div>
        </Animation>
    </div>;
}
```

## Props esquema

```sh
type Children = JSX.Element | JSX.Element[];
```

Props
-------

|   params   |      required       |  type      |
| ---------- | :-----------------: | :--------: |
| children   | :heavy_check_mark:  | `Children` |
| isClose    | :heavy_check_mark:  | `boolean`  |