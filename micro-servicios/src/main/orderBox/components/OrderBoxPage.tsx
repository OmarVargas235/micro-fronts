// 1. librerias
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 2. components
import Card from '../container/Card';
import Button from '../../../layauts/button/Button';
import { Text } from '../../../layauts/Text';

// 3. interfaces
import { TResumeOrder, Lista } from '../../../service/orders';

// 4. estilos
import { Container, Footer } from '../styled';

// 5. iconos
import { BsArrowLeftShort } from "react-icons/bs";

// 6.- hooks
import { useMediaQuery } from '../../../hooks/useMediaQuery';

// 7.- utils
import { formatDecimals } from '../../../helpers/utils';

// 8.- context
import { OrderBoxContext } from '../OrderBoxProvider';

// 9.- theme
import { theme } from '../../../theme/theme';

interface Props {
    products: Lista[];
    empty: () => void;
    resume: TResumeOrder;
    handleClick: () => void;
}

const OrderBoxPage = ({ products, empty, resume, handleClick }: Props): JSX.Element => {

    const history = useNavigate();
    const code = useParams().codigo ?? '';

    const matches = useMediaQuery('(max-width: 400px)');

    const { state:{ total } } = useContext(OrderBoxContext);

	return (
		<Container className='pt-5' isVoucher={false}>
            <div className='container px-2'>
                <div className='container-arrow-left w-100'>
                    <BsArrowLeftShort
                        className='mr-3 pointer'
                        size={35}
                        onClick={() => history(`/nuevos-pedidos/${code}`)}
                    />
                </div>

                <div className='d-flex justify-content-end'>
                    <Text
                        color={theme.secondary}
                        weight='600'
                        className='pointer'
                        onClick={empty}
                    >Vaciar</Text>
                </div>

                <Text
                    color={theme.primary}
                    weight='bold'
                    size={matches ? '18px' : '26px'}
                >Tu caja de pedido</Text>

                <div className='d-flex justify-content-between mb-5'>
                    <Text>{products.length} item en el pedido</Text>
                    <Text
                        color={theme.secondary}
                        className='pointer'
                        onClick={() => history(`/nuevos-pedidos/${code}`)}
                    >+ Agregar más</Text>
                </div>

                <div className='row'>
                    {
                        products.map((v, index) => (
                            <Card
                                key={index}
                                data={v}
                                empty={empty}
                            />
                        ))
                    }
                </div>

                <Text
                    color={theme.primary}
                    size='18px'
                    weight='600'
                >Resumen del pago</Text>

                <div className='d-flex justify-content-between'>
                    <Text>Subtotal del pedido</Text>
                    <Text color={theme.primary}>{formatDecimals({ n: total - resume.precio_igv })}</Text>
                </div>

                <div className='d-flex justify-content-between'>
                    <Text>IGV</Text>
                    <Text color={theme.primary}>{formatDecimals({ n: resume.precio_igv })}</Text>
                </div>

                <Footer className='p-4 pb-0 w-100 d-flex justify-content-center mt-4'>
                    <div className='d-flex justify-content-between align-items-center container-footer'>
                        <div>
                            <Text color={theme.primary} className='text1'>{products.length} productos</Text>
                            <Text
                                color={theme.primary}
                                size='20px'
                                weight='550'
                                className='text2'
                            >{formatDecimals({ n: total })}</Text>
                        </div>

                        <Button
                            handleClick={handleClick}
                            disabled={products.length === 0}
                        >Hacer pedido</Button>
                    </div>
                </Footer>
            </div>
        </Container>
	);
}

export default OrderBoxPage;