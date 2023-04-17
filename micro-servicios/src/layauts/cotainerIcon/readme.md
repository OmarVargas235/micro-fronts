# COMO USAR EL COMPONENTE

```sh
import CotainerIcon from 'layauts/cotainerIcon/CotainerIcon';
import { MdDelete } from "react-icons/md";

const Component = (): JSX.Element => {
    
    return <>
        <CotainerIcon
            icon={<MdDelete size={30} />}
            isCheck={false}
        />

        <CotainerIcon
            icon={<MdDelete size={30} />}
            isCheck={true}
        />
    </>;
}
```

## Props esquema

Props
-------

|  params |         required         |    type       |
| ------- | :----------------------: | :-----------: |
| icon    | :heavy_check_mark:       | `JSX.Element` |
| isCheck | :heavy_multiplication_x: | `boolean`     |