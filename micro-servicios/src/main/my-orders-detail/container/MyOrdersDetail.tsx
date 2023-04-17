// 1. librerias
import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 2. components
import MyOrdersDetailPage from '../components/MyOrdersDetailPage';

// 3.- servicios
import { orders } from '../../../service/orders';
import { customer } from '../../../service/customer';

// 4.- interfaces
import { DetailOrder } from '../../../service/interfaces';

// 5.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 6.- utils
import { alert, roundDecimals } from '../../../helpers/utils';

interface Cart {
	code: string;
	count: number;
	id: number;
	name: string;
	presentation: string;
	price: number;
	priceProduct: number;
	stock: number;
}

const MyOrdersDetail = (): JSX.Element => {

	const { id } = useParams();
	const history = useNavigate();

	const { state:{ detailOrder }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [data, setData] = useState<DetailOrder[]>([]);
	const [stockTotal, setStockTotal] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {

		if (id === undefined) return;

		async function callAPI(): Promise<void> {

			dispatchGlobal({ type: 'IS_LOADING', payload: true });
			
			const result = await orders.getDetailOrder(Number(id));

			dispatchGlobal({ type: 'IS_LOADING', payload: false });

			if (result.status !== 200 || result.data === null)
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

			let total: number = 0;
			const stocks = result.data.map(v => v.cantidad_requerida).reduce((cont, v) => { cont += v; return cont; }, 0);

			const data = result.data.map(v => {

				const priceDiscount = v.precio_unitario_sin_igv * v.cantidad_requerida - v.descuento;
				const priceIgv = priceDiscount + (priceDiscount*.18);

				total += roundDecimals(priceIgv, 2);
				
				return {
					...v,
					valor_neto: roundDecimals(priceIgv, 2),
				};
			})

			setData(data);
			setTotal(total);
			setStockTotal(stocks);
		}

		void callAPI();

	}, [id]);

	const resendVerificationRequest = async(): Promise<void> => {
		
		const cart: Record<string, Cart> = {};

		data.forEach(v => {
			
			cart[v.id_articulo] = {
				code: v.cod_articulo,
				count: v.cantidad_requerida,
				id: v.id_articulo,
				name: v.nombre,
				priceProduct: v.precio_unitario_sin_igv,
				presentation: v.presentacion,
				stock: v.stock,
				price: v.precio_unitario_sin_igv * v.cantidad_requerida,
			}
		});

		const body = {
			codigo: detailOrder.cliente_codigo, nombrecomercial: '', razonsocial: '',
			page: 1, rowsPerPage: 10
		};

		dispatchGlobal({ type: 'IS_LOADING', payload: true });
		
		const result = await customer.getCustomer(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

		if (result.data.clientes.length === 0)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No se encontro el cliente' });

		const [client] = result.data.clientes;

		dispatchGlobal({ type: 'CART', payload: cart });
		dispatchGlobal({ type: 'CLIENT', payload: client });
		history(`/caja-pedidos/${client.codigo}`);
	}

	return <MyOrdersDetailPage
		data={data}
		resendVerificationRequest={resendVerificationRequest}
		stockTotal={stockTotal}
		total={total}
	/>
}

export default MyOrdersDetail;