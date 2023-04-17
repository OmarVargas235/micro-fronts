// 1. librerias
import { useContext } from 'react';

// 2. components
import { Text } from '../../../layauts/Text';

// 3. iconos
import { BsArrowLeftShort } from "react-icons/bs";

// 4.- context
import { OrderBoxContext } from '../OrderBoxProvider';

// 5.- utils
import { formatDecimals } from '../../../helpers/utils';

// 6.- theme
import { theme } from '../../../theme/theme';

interface Props {
    setViews: (value: number) => void;
    title: string;
    idView: number;
}

const Header = ({ setViews, title, idView }: Props): JSX.Element => {

    const { state:{ total, countProduct } } = useContext(OrderBoxContext);

    return <>
        <div className='d-flex'>
            <BsArrowLeftShort
                className='mr-3 pointer'
                size={35}
                onClick={() => setViews(idView)}
            />

            <Text
                color={theme.primary}
                weight='600'
                size='20px'
            >{title}</Text>
        </div>

        <div className='d-flex justify-content-between'>
            <Text>{countProduct} Items en el pedido</Text>
            <Text isUppercase={true}>Total</Text>
        </div>

        <div className='d-flex justify-content-between mb-5'>
            <div></div>
            <Text
                color={theme.primary}
                weight='600'
            >{formatDecimals({ n: total })}</Text>
        </div>
    </>;
}

export default Header;