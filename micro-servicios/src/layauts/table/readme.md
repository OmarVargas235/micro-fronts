# COMO USAR EL COMPONENTE

## Table basico

```sh
import Table from 'layauts/table/Table';

const Component = (): JSX.Element => {
    
    return <Table
        thead={['head1', 'head2', 'Acciones', ...]}
        tbody={[
            [
                idHead1, 2, 'Omar',
                <div key={2}>
                    <BiEditAlt />
                    <IoCloseOutline />
                </div>
            ],
            [
                ...
            ],
            [
                ...
            ],
            ...
        ]}
        width='180px' --> ancho de las columnas
        refresh={() => console.log("refresh")}
        addUser={() => console.log("addUser")}
    />;
}
```

## Table utilidades

```sh
import Table from 'layauts/table/Table';

const Component = (): JSX.Element => {
    
    return <Table
        thead={['head1', 'head2', 'Acciones', ...]}
        tbody={[
            [
                idHead1, 2, 'Omar',
                <div key={2}>
                    <BiEditAlt />
                    <IoCloseOutline />
                </div>
            ],
            [
                ...
            ],
            [
                ...
            ],
            ...
        ]}
        width='180px' --> ancho de las columnas
        refresh={() => console.log("refresh")}
        addUser={() => console.log("addUser")}
        isNewUser={true}
        alignHead='left'
        alignBody='right'
    />;
}
```

## Props esquema

```sh
type Align = 'left' | 'center' | 'right';
```

Props
-------

|  params   |          required        |    type    |
| --------- | :----------------------: | :--------: |
| thead     | :heavy_check_mark:       | `string[]` |
| tbody     | :heavy_check_mark:       | `DataBody` |
| width     | :heavy_check_mark:       | `string`   |
| alignHead | :heavy_multiplication_x: | `Align`    |
| alignBody | :heavy_multiplication_x: | `Align`    |
| refresh   | :heavy_check_mark:       | `Function` |
| addUser   | :heavy_check_mark:       | `Function` |
| isNewUser | :heavy_multiplication_x: | `boolean`  |