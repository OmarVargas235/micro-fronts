// 1. librerias
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 2.- components
import Button from '../../../layauts/button/Button';
import { Text } from '../../../layauts/Text';

// 3. estilos
import { Footer } from '../styled';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- utils
import { alert, formatDecimals, roundDecimals } from '../../../helpers/utils';

// 5.- theme
import { theme } from '../../../theme/theme';

const FooterPage = (): JSX.Element => {

    const { state:{ products, client }, dispatch:dispatchGlobal } = useContext(GlobalContext);

    const history = useNavigate();
    const codigo = useParams().codigo ?? '';

    const [total, setTotal] = useState<number>(0);
    const [price, setprice] = useState<number>(0);

    useEffect(() => {

        let count = 0;
        let price = 0;

        for (const x in products) {

            count += products[x].count;
            price += roundDecimals(products[x].price, 5);
        }

        setTotal(count);
        setprice(price);
        
    }, [products]);

    const handleClick = (): void => {

        const igv = .18;
        const priceNeto = price + (price*igv);

        if (total === 0) return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'Debes agregar 1 producto'});

        if (priceNeto < client.montominimo && !client.isTop) return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: `El monto minimo es: ${formatDecimals({ n: client.montominimo })}`});

        history(`/caja-pedidos/${codigo}`);
    }

    return <Footer className='d-flex justify-content-between align-items-center p-4 w-100'>
        <div>
            <Text color={theme.primary} className='text1'>{total} productos</Text>

            <Text
                color={theme.primary}
                size='20px'
                weight='550'
                className='text2'
            >{formatDecimals({ n: price })}</Text>
        </div>

        <Button
            handleClick={handleClick}
            classes='btn'
        >Ir a la caja de pedido</Button>
    </Footer>;
}

export default FooterPage;