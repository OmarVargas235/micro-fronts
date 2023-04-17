// 1.- Librerias
import { Fragment, useContext } from 'react';

// 2.- componentes
import { Text } from '../../../layauts/Text';
import Button from '../../../layauts/button/Button';
import Header from './Header';
import ContainerModal from '../container/ContainerModal';

// 3.- estilos
import { Container, Table } from "../styled";

// 4.- utils
import { formatDecimals } from '../../../helpers/utils';
import { Views } from '../utils';

// 5.- interfaces
import { Modal as IModal } from '../container/Summary';
import { Product } from '../../../helpers/interface';

// 4.- context
import { OrderBoxContext } from '../OrderBoxProvider';
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- utils
import { theme } from '../../../theme/theme';

interface Props {
    setViews: (value: number) => void;
    generateDraft: () => Promise<void>;
    setModal: (value: IModal) => void;
    modal: IModal;
    dataProducts: Product[];
    subTotal: number;
}

const SummaryPage = ({ setViews, generateDraft, setModal, modal, dataProducts, subTotal }: Props): JSX.Element => {

    const { state:{ summary, direction, directions } } = useContext(OrderBoxContext);
    const { state:{ client } } = useContext(GlobalContext);

    return <Container className='pt-5' isVoucher={true}>
        <div className='container px-2 mb-4'>
            <Header
                setViews={setViews}
                title='Resumen'
                idView={Views.voucher}
            />

            <Text color={theme.primary} weight='bold' className='my-4'>Resumen de productos</Text>

            <Table className='row' isScroll={dataProducts.length > 5}>
                <div className='col-3'>Producto</div>
                <div className='col-3 text-center'>Cant.</div>
                <div className='col-3'>P.unit</div>
                <div className='col-3'>P.total</div>

                {
                    dataProducts.map((v, index) => (<Fragment key={index}>
                        <div className='col-3 mb-3' color={theme.primary}>{v.name}</div>
                        <div className='col-3 mb-3 text-center' color={theme.primary}>{v.count}</div>
                        <div className='col-3 mb-3' color={theme.primary}>{formatDecimals({ n: v.priceProduct, symbol: "", nDecimals: 5 })}</div>
                        <div className='col-3 mb-3' color={theme.primary}>{formatDecimals({ n: v.price, symbol: "" })}</div>
                    </Fragment>))
                }
            </Table>

            <Text color={theme.primary} weight='bold' className='my-4'>Resumen del pago</Text>
            
            <div className='row'>
                {
                    [
                        { title: 'Subtotal del pedido', description: formatDecimals({ n: subTotal, symbol: "" }) },
                        { title: 'Igv', description: formatDecimals({ n: summary.igv, symbol: "" }) },
                    ].map((v, index) => (
                        <Fragment key={index}>
                            <Text className='col-6 pl-0'>{v.title}</Text>
                            <Text className='col-6 pr-0 text-right' color={theme.primary}>{v.description}</Text>
                        </Fragment>
                    ))
                }
            </div>

            <Text color={theme.primary} weight='bold' className='my-4'>Resumen de entrega</Text>

            <div className='row'>
                {
                    [
                        { title: 'Dirección de Entrega', description: directions.find(v => v.codigo === direction)?.lugar_entrega },
                        { title: 'Condición de venta', description: client.tipopago },
                        { title: 'Fecha de entrega', description: summary.deadline },
                        { title: 'Horario de atención', description: summary.officeHours },
                        { title: 'Observación', description: summary.officeHours },
                        { title: 'Observación', description: summary.observation },
                    ].map((v, index) => (
                        <Fragment key={index}>
                            <Text className='col-6 pl-0 mb-2' color={theme.primary}>{v.title}</Text>
                            <Text className='col-6 pr-0 mb-2 word-wrap' color={theme.primary}>{v.description}</Text>
                        </Fragment>
                    ))
                }
            </div>

            <Button
                fullWidth={true}
                classes='mt-4'
                handleClick={() => {void generateDraft()}}
            >Generar Pedido</Button>
        </div>

        <ContainerModal
            modal={modal}
            setModal={setModal}
        />
    </Container>
};

export default SummaryPage;