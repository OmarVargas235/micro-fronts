# COMO USAR EL COMPONENTE

## Modal Basico

```sh
import { useState } from 'react';
import Modal from 'layauts/modal/Modal';

const Component = (): JSX.Element => {

    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    
    return <Modal
        closeModal={(v) => setIsOpenModalDelete(v)}
        open={isOpenModalDelete}
        textBtn='Click'
    >   
        <p>Aqui va algun texto?</p>
    </Modal>;
}
```

## Modal con botones personalizados

```sh
import { useState } from 'react';
import Modal from 'layauts/modal/Modal';
import Button from 'layauts/button/Button';

const Component = (): JSX.Element => {

    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    
    return <Modal
        closeModal={(v) => setIsOpenModalDelete(v)}
        open={isOpenModalDelete}
        textBtn=''
        isButton={false}
        classess='modal'
    >   
        <p>Aqui va algun texto?</p>

        <div className='d-flex'>
            <Button
                classes='mr-2'
                color='#1e7e34'
                handleClick={() => console.log("click")}
            >Aceptar</Button>
            
            <Button color='#dc3545' dataClose='close'>Cerrar Modal</Button>
        </div>
    </Modal>;
}
```

## Modal ancho

```sh
import { useState } from 'react';
import Modal from 'layauts/modal/Modal';

const Component = (): JSX.Element => {

    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    
    return <Modal
        closeModal={(v) => setIsOpenModalDelete(v)}
        open={isOpenModalDelete}
        textBtn='Click'
        width='300px'
    >   
        <p>Aqui va algun texto?</p>
    </Modal>;
}
```

## Props esquema

```sh
type Children = JSX.Element | JSX.Element[];
```

Props
-------

|  params    |        required          |    type    |
| ---------- | :----------------------: | :--------: |
| children   | :heavy_check_mark:       | `Children` |
| open       | :heavy_check_mark:       | `boolean`  |
| closeModal | :heavy_check_mark:       | `Function` |
| classess   | :heavy_multiplication_x: | `string`   |
| textBtn    | :heavy_check_mark:       | `string`   |
| isButton   | :heavy_multiplication_x: | `boolean`  |
| width      | :heavy_multiplication_x: | `string`   |