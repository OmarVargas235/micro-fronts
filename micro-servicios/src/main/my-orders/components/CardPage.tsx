// 1.- Librerias
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 2.- components
import { ContainerCard } from '../styled';
import { Text } from '../../../layauts/Text';

// 3.- icons
import { BsArrowRight } from 'react-icons/bs';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- interface
import { ListOrder } from '../container/MyOrders';

// 6.- interface
import { theme } from '../../../theme/theme';

interface Props {
    data: ListOrder;
}

type State = 'AP' | 'PE' | 'RE' | 'BR' | 'AN';
type Badge = 'badge-success' | 'badge-warning' | 'badge-danger' | 'badge-secondary' | 'badge-dark';

const colorBadge: Record<State, Badge> = {
    'AP': 'badge-success',
    'PE': 'badge-warning',
    'RE': 'badge-danger',
    'BR': 'badge-secondary',
    'AN': 'badge-dark',
}

const CardPage = ({ data }: Props): JSX.Element => {

    const { dispatch:dispatchGlobal } = useContext(GlobalContext);

    const history = useNavigate();

    const handleClick = (): void => {

        const { badge, title, nmr, ...obj } = data;

        dispatchGlobal({ type: 'DETAIL_ORDER', payload: obj });
        history(`/detalle-mis-pedidos/${data.nmr}`);
    }

    return <ContainerCard className='py-2 px-4 mb-2'>
        <Text color='#090F47'>№ Pedido: {data.nmr}</Text>
        <Text color={theme.primary} size='20px' weight='bold'>{data.title}</Text>

        <span
            className={`badge badge-pill ${colorBadge[data.estado_roxfarma_abrev]} p-2`}
        >{data.estado_roxfarma}</span>

        <div className='w-100 d-flex justify-content-end align-items-center'>
            <Text
                color='#2F93FB'
                className='pointer'
                onClick={handleClick}
            >Ver detalle</Text>

            <BsArrowRight
                color='#2F93FB'
                className='pointer mt-1 ml-2'
                onClick={handleClick}
            />
        </div>
    </ContainerCard>;
}

export default CardPage;