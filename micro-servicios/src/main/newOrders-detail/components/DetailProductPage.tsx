// 1.- Librerias
import { useContext } from 'react';

// 2.- components
import { Text } from '../../../layauts/Text';

// 3.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 4.- interfaces
import { DeatilProduct } from '../../../service/interfaces';

// 5.- utils
import { formatDecimals } from '../../../helpers/utils';

// 6.- utils
import { theme } from '../../../theme/theme';

interface Props {
    data: DeatilProduct;
}

const DetailProductPage = ({ data }: Props): JSX.Element => {

    const { state:{ client } } = useContext(GlobalContext);

    return <>
        <Text
            color={theme.primary}
            weight='600'
            size='20px'
            className='my-4'
        >Detalles del Producto</Text>

        {
            [
                `Articulo: ${data.nombre}`,
                `Lote: ${data.codigo}`,
                `Ubicación: ${client.direccion}`,
                `Precio unitario: ${formatDecimals({ n: data.precio, nDecimals: 5 })}`,
                `Stock: ${data.stock}`,
            ].map((v, index) => (
                <Text key={index}>{v}</Text>
            ))
        }
    </>
}

export default DetailProductPage;