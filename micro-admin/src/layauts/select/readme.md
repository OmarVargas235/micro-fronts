# COMO USAR EL COMPONENTE

## Select basico

```sh
import Select, { IOption } from 'layauts/select/Select';

const Component = (): JSX.Element => {
    
    return <Select
        options={[
            { label: 'hola1', value: 1 },
            { label: 'hola2', value: 2 },
            { label: 'hola3', value: 3 },
            { label: 'hola4', value: 4 },
        ]}
        handleChange={(e: IOption) => console.log(e)}
    />;
}
```

## Select utilidades

```sh
import Select, { IOption } from 'layauts/select/Select';

const Component = (): JSX.Element => {
    
    return <Select
        options={[
            { label: 'hola1', value: 1 },
            { label: 'hola2', value: 2 },
            { label: 'hola3', value: 3 },
            { label: 'hola4', value: 4 },
        ]}
        handleChange={(e: IOption) => console.log(e)}
        className="class1"
        classNameSelect="classNameSelect"
        label='aqui puede ir cualquier texto...'
        readonly={true}
    />;
}
```

## Select valor por defecto y error

- Para escoger un valor por defecto tiene que pasar un valor numerico y tiene que coincidir con los value de la prop "options"

- Ejem: Los values de options estan dentro del intervalo --> 1, 2, 3, 4

```sh
import Select, { IOption } from 'layauts/select/Select';

const Component = (): JSX.Element => {
    
    return <Select
        options={[
            { label: 'hola1', value: 1 },
            { label: 'hola2', value: 2 },
            { label: 'hola3', value: 3 },
            { label: 'hola4', value: 4 },
        ]}
        handleChange={(e: IOption) => console.log(e)}
        value={3}
        isError={true}
    />;
}
```

## Select busqueda

```sh
import Select, { IOption } from 'layauts/select/Select';

const Component = (): JSX.Element => {
    
    return <Select
        options={[
            { label: 'hola1', value: 1 },
            { label: 'hola2', value: 2 },
            { label: 'hola3', value: 3 },
            { label: 'hola4', value: 4 },
        ]}
        handleChange={(e: IOption) => console.log(e)}
        isSearch={true}
    />;
}
```

## Props esquema

Props
-------

|  params         |        required          |    type     |
| --------------- | :----------------------: | :---------: |
| options         | :heavy_check_mark:       | `IOption[]` |
| handleChange    | :heavy_check_mark:       | `Function`  |
| className       | :heavy_multiplication_x: | `string`    |
| classNameSelect | :heavy_multiplication_x: | `string`    |
| label           | :heavy_multiplication_x: | `string`    |
| value           | :heavy_multiplication_x: | `number`    |
| isError         | :heavy_multiplication_x: | `boolean`   |
| readonly        | :heavy_multiplication_x: | `boolean`   |
| isSearch        | :heavy_multiplication_x: | `boolean`   |