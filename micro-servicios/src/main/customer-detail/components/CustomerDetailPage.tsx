// 1. librerias

// 2. components
import Detail from '../../../layauts/detail/Detail';

// 3. interfaces
import { Customer } from '../../../helpers/interface';

// 4.- utils
import { formatDecimals } from '../../../helpers/utils';

interface Props {
    data: Customer;
}

const CustomerDetailPage = ({ data }: Props): JSX.Element => {
    
	return (
		<Detail
            subTitle={data.nombrecomercial}
            title='Detalle Cliente'
            list={[
                { word: 'Código', description: data.codigo },
                { word: 'Ruc', description: data.ruc },
                { word: 'Razón Social', description: data.razonsocial },
                { word: 'Razón Comercial', description: data.nombrecomercial },
                { word: 'Estado', description: data.estado },
                { word: 'Tipo', description: data.tipo },
                { word: 'Crédito disponible', description: formatDecimals({ n: data.lineacredito }), color: data.lineacredito <= 0 ? 'red' : undefined },
                { word: 'clienteTop', description: data.isTop ? 'Si' : 'No' },
                { word: 'Condición de venta', description: data.tipopago },
                { word: 'Descuento por cliente', description: data.descuento },
                { word: 'Dirección', description: data.direccion },
            ]}
            pathArrowLeft='/clientes'
            path={`/nuevos-pedidos/${data.codigo}`}
        />
	);
}

export default CustomerDetailPage;