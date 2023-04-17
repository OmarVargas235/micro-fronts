// 1. librerias

// 2. components
import Detail from '../../../layauts/detail/Detail';
import Select, { IOption } from '../../../layauts/select/Select';

// 3. interfaces
import { DeatilProduct } from '../../../service/interfaces';

// 4.- estilos
import { Container } from '../styled';

// 5.- utils
import { formatDecimals } from '../../../helpers/utils';

interface Props {
    data: DeatilProduct;
}

const ProductDetailPage = ({ data }: Props): JSX.Element => {

	return (
        <Container>
            <Detail
                subTitle={data.nombre}
                title='Detalle Producto'
                list={[
                    { word: 'Código', description: data.codigo },
                    { word: 'Presentación', description: data.presentacion },
                    { word: 'Registro Sanitario', description: data.registro },
                    { word: 'Forma Farmaceutica', description: data.forma },
                    { word: 'Categoria', description: data.categoria },
                    { word: 'Stock disponible', description: data.stock.toString() },
                    { word: 'Precio Base', description: formatDecimals({ n: data.precio, nDecimals: 5 }) },
                    {
                        word: 'Descuentos por Producto',
                        description: <Select
                            isSearch={true} 
                            className='select'
                            options={data.descuentos.length === 0
                                ? [{ label: '', value: -1 }]
                                : data.descuentos.map((v, index) => ({
                                label: `${v.nombre} ${v.porcentaje}%`,
                                value: index
                            }))}
                            handleChange={(e: IOption) => console.log(e)}
                        />
                    },
                ]}
                pathArrowLeft='/productos'
                path='/clientes'
            />
        </Container>
	);
}

export default ProductDetailPage;