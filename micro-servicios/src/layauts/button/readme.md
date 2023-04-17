# COMO USAR EL COMPONENTE

```sh
import Button from 'layauts/button/Button';

const Component = (): JSX.Element => {

    const handleClick = (): void => {
            
        console.log("Click");
    }
    
    return <Button
        handleClick={handleClick}
    >Click</Button>;
}
```

## Color Button y clases

- La prop "classes" se le agrega al tag "button" ("<button class="btn-danger"></button>")
- La prop "classessText" se le agrega al tag "span" ("<button class="btn-danger"><span class="color-texto">Text</span></button>")

```sh
import Button from 'layauts/button/Button';

const Component= (): JSX.Element => {

    const handleClick = (): void => {
            
        console.log("Click");
    }
    
    return <Button
        handleClick={handleClick}
        color='#1e7e34'
        classes='btn-danger'
        classessText='color-texto'
    >Click</Button>;
}
```

## Button con icono a la izquierda y derecha

```sh
import Button from 'layauts/button/Button';
import { AiOutlineUser } from "react-icons/ai";

const Component= (): JSX.Element => {
    
    return <>
        <Button
            edge='start'
            icon={<AiOutlineUser size={20} />}
        >Click</Button>

        <Button
            edge='end'
            icon={<AiOutlineUser size={20} />}
        >Click</Button>
    </>;
}
```

## Button para cerrar modales modales

```sh
import Button from 'layauts/button/Button';
import Modal from 'layauts/modal/Modal';

const Component= (): JSX.Element => {
    
    return <Modal
            closeModal={(v) => console.log(v)}
            open={true}
            textBtn=''
        >   
            <p>...</p>

            <div className='d-flex'>
                <Button color='#dc3545' dataClose='close'>Cerrar Modal</Button>
            </div>
        </Modal>;
}
```

## Props esquema

```sh
type TypeChildren = JSX.Element | JSX.Element[] | string;
type Edge = 'start' | 'end' | null;
type Type = 'button' | 'submit';
type DataClose = 'close' | '';
```

Props
-------

|   params     |         required          |    type        |
| ------------ | :-----------------------: | :------------: |
| children     | :heavy_check_mark:        | `TypeChildren` |
| classes      | :heavy_multiplication_x:  | `string`       |
| classessText | :heavy_multiplication_x:  | `string`       |
| color        | :heavy_multiplication_x:  | `string`       |
| fullWidth    | :heavy_multiplication_x:  | `boolean`      |
| icon         | :heavy_multiplication_x:  | `JSX.Element`  |
| edge         | :heavy_multiplication_x:  | `Edge`         |
| type         | :heavy_multiplication_x:  | `Type`         |
| handleClick  | :heavy_multiplication_x:  | `Funtion`      |
| disabled     | :heavy_multiplication_x:  | `boolean`      |
| dataClose    | :heavy_multiplication_x:  | `DataClose`    |