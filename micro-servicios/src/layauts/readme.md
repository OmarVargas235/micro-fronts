# COMO USAR COMPONENTES

## Avatar

```sh
import Avatar from 'layauts/Avatar';

const Component = (): JSX.Element => {
    
    return <Avatar
        color="purple"
        colorLetter="green"
        width="50px"
        height="50px"
    >HM</Avatar>;
}
```

## Props esquema

Props
-------

|  params     |         required         |   type   |
| ----------- | :----------------------: | :------: |
| color       | :heavy_multiplication_x: | `string` |
| colorLetter | :heavy_multiplication_x: | `string` |
| width       | :heavy_multiplication_x: | `string` |
| height      | :heavy_multiplication_x: | `string` |

## Badge

### Badge estatico

```sh
import { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { OptionsBadge } from 'layauts/Badge';

const optionsBadges: OptionsBadge[] = [
    { name: 'Name1', id: 1, icon: <AiOutlineUser /> },
    { name: 'Name2', id: 2 },
    { name: 'Name3', id: 3 },
];

const Component = (): JSX.Element => {

    const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});
    
    return <Badge
        elements={optionsBadges}
        setBadgeData={setBadgeData}
    />;
}
```

### Badge dinamico

```sh
import { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { OptionsBadge } from 'layauts/Badge';

const optionsBadges: OptionsBadge[] = [
    { name: 'Name1', id: 1, icon: <AiOutlineUser /> },
    { name: 'Name2', id: 2 },
    { name: 'Name3', id: 3 },
];

const Component = (): JSX.Element => {

    const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});
    
    return <Badge
        elements={optionsBadges}
        setBadgeData={setBadgeData}
    />;
}
```

## Props esquema

Props
-------

|  params      |        required          |    type          |
| ------------ | :----------------------: | :--------------: |
| elements     | :heavy_check_mark:       | `OptionsBadge[]` |
| setBadgeData | :heavy_check_mark:       | `Function`       |
| isSelect     | :heavy_multiplication_x: | `boolean`        |

## Card

```sh
import Card from 'layauts/Card';

const Component = (): JSX.Element => {
    
    return <Card
        img="https//:imagen"
        title="title"
        texts={[`Cod: 123`, "razonsocial", "direccion"]}
        path='/redirigir'
        data={{}}
        handleClick={() => console.log("Hola Mundo")}
    />;
}
```

## Props esquema

```sh
type Img = string | null;
```

Props
-------

|  params     |         required         |    type    |
| ----------- | :----------------------: | :--------: |
| img         | :heavy_multiplication_x: | `Img`      |
| title       | :heavy_check_mark:       | `string`   |
| texts       | :heavy_check_mark:       | `string[]` |
| path        | :heavy_check_mark:       | `string`   |
| data        | :heavy_multiplication_x: | `object`   |
| handleClick | :heavy_multiplication_x: | `Function` |

## Text

```sh
import Text from 'layauts/Text';

const Component = (): JSX.Element => {
    
    return <Text
        color='#0E0E0E'
        size="20px"
        weight='bold'
        className='text-center mx-1'
        isUppercase={true}
    >Hola Mundo</Text>;
}
```

## Props esquema

Props
-------

|  params     |         required         |    type   |
| ----------- | :----------------------: | :-------: |
| color       | :heavy_multiplication_x: | `string`  |
| size        | :heavy_multiplication_x: | `string`  |
| weight      | :heavy_multiplication_x: | `string`  |
| isUppercase | :heavy_multiplication_x: | `boolean` |