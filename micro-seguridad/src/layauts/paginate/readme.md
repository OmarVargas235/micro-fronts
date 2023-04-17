# COMO USAR EL COMPONENTE

```sh
import Paginate from 'layauts/paginate/Paginate';

const Component = (): JSX.Element => {

    const rowsPerPage = (n: number): void => {

		console.log(n);
	}

	const page = (n: number): void => {

		console.log(n);
	}
    
    return <Paginate
        total={20}
        rowsPerPage={rowsPerPage}
        page={page}
    />
}
```

## Props esquema

Props
-------

|  params     |       required      |  type      |
| ----------- | :-----------------: | :--------: |
| total       | :heavy_check_mark:  | `number`   |
| rowsPerPage | :heavy_check_mark:  | `Function` |
| page        | :heavy_check_mark:  | `Function` |