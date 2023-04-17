# COMO USAR EL COMPONENTE

## Checkbox basico

```sh
import Checkbox from 'layauts/checkbox/Checkbox';

const Component = (): JSX.Element => {
    
    return <Checkbox
        id='id'
        name='name'
        value='value'
        handleChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
    >Click...</Checkbox>;
}
```

## Color Checkbox y clases

- La prop "classes" se le agrega al contenedor del tag input checkbox y tag label
```sh
import Checkbox from 'layauts/checkbox/Checkbox';

const Component= (): JSX.Element => {
    
    return <Checkbox
        id='id'
        name='name'
        value='value'
        handleChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
        borderColor="red"
        color="purple"
        classes="class1"
    >Click...</Checkbox>;
}
```

## Checkbox con a la izquierda o derecha del tag label
```sh
import Checkbox from 'layauts/checkbox/Checkbox';

const Component= (): JSX.Element => {
    
    return <Checkbox
        id='id'
        name='name'
        value='value'
        handleChange={(e: ChangeEvent<HTMLInputElement>) => console.log(e)}
        isAfter={true}
        isBeetween={true}
    >Click...</Checkbox>;
}
```

## Checkbox marcarlo o desmarcarlo

```sh
import useState from 'react';
import Checkbox from 'layauts/checkbox/Checkbox';

const Component= (): JSX.Element => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    
    return <Checkbox
        id='id'
        name='name'
        value='value'
        handleChange={(e: ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked)}
        isChecked={isChecked}
    >Click...</Checkbox>;
}
```

## Props esquema

```sh
type Color = string | null;
type Children = string | string[];
type IsChecked = boolean | null;
```

Props
-------

|   params     |         required         |     type    |
| ------------ | :----------------------: | :---------: |
| borderColor  | :heavy_multiplication_x: | `Color`     |
| color        | :heavy_multiplication_x: | `Color`     |
| id           | :heavy_check_mark:       | `string`    |
| name         | :heavy_check_mark:       | `string`    |
| value        | :heavy_check_mark:       | `string`    |
| children     | :heavy_check_mark:       | `Children`  |
| handleChange | :heavy_check_mark:       | `Funtion`   |
| isAfter      | :heavy_multiplication_x: | `boolean`   |
| isBeetween   | :heavy_multiplication_x: | `boolean`   |
| classes      | :heavy_multiplication_x: | `string`    |
| isChecked    | :heavy_multiplication_x: | `IsChecked` |