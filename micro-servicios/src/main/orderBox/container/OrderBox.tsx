// 1. librerias
import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// 2. components
import OrderBoxPage from '../components/OrderBoxPage';

// 3. context
import { GlobalContext } from '../../../context/GlobalProvider';
import { OrderBoxContext } from '../OrderBoxProvider';

// 4.- servicios
import { orders, TResumeOrder, Lista } from '../../../service/orders';

// 5.- utils
import { alert, roundDecimals, formatDecimals } from '../../../helpers/utils';
import { Views } from '../utils';

interface Props {
	setViews: (value: number) => void;
}

type ListaProducto = Array<{codigo_articulo: string; cantidad: number}>;

const defaultValue: TResumeOrder = {
	lista_bonificacion: [],
	lista_producto: [],
	lista_promocion: [],
	precio_descuento: 0,
	precio_descuento_cliente: 0,
	precio_descuento_producto: 0,
	precio_bruto: 0,
	precio_igv: 0,
	precio_neto: 0,
}

const OrderBox = ({ setViews }: Props): JSX.Element => {

	const { state, dispatch:dispatchGlobal } = useContext(GlobalContext);
	const { state:{ summary, isResumeOrder, total }, dispatch } = useContext(OrderBoxContext);

	const codeClient = useParams().codigo;

	const [products, setProducts] = useState<Lista[]>([]);
	const [resume, setResume] = useState<TResumeOrder>(defaultValue);

	const callAPI = useCallback(async (codeClient, listaProducto: ListaProducto): Promise<void> => {

		const body = {
			lista_producto: listaProducto,
			codigo_cliente: codeClient ?? '',
		}
		
		dispatchGlobal({ type: 'IS_LOADING', payload: true });

		const result = await orders.resumeOrder(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });
			
		const { lista_producto:listaProductoBD, precio_bruto:precioBruto, precio_descuento_cliente:precioDescuentoCliente, precio_descuento_producto:precioDescuentoProducto } = result.data;

		const totalPrice = listaProductoBD.reduce((count, v) => {

			const price = v.precio_descontado_unidad !== 0
				? v.precio_descontado_unidad : v.precio_venta_unidad;
			
			const sum: number = roundDecimals(price, 5) * v.cantidad + count;

			return sum;
			
		}, 0);

		const precioIgv = roundDecimals( Number(roundDecimals(totalPrice, 2) * .18), 2 );		
		const data = { ...summary, discountClient: precioDescuentoCliente, discountProduct: precioDescuentoProducto, igv: precioIgv, subTotal: precioBruto };
			
		dispatch({ type: 'SUMMARY', payload: data });
		
		setProducts(listaProductoBD.map(v => ({
			...v,
			precio_venta_unidad: v.precio_descontado_unidad !== 0
				? v.precio_descontado_unidad : v.precio_venta_unidad,
		})));

		setResume(state => ({
			...state,
			precio_igv: precioIgv
		}));

		dispatch({ type: 'TOTAL', payload: roundDecimals(totalPrice, 5) + precioIgv });
		dispatch({ type: 'COUNT_PRODUCT', payload: listaProductoBD.length });

	}, []);

	useEffect(() => {

		if (!isResumeOrder) return;

		const listaProducto = Object.values(state.products)
			.map(v => ({ codigo_articulo: v.code, cantidad: v.count }));

		if (listaProducto.length === 0) {

			dispatchGlobal({ type: 'IS_LOADING', payload: false });

			return setResume({
				...defaultValue,
				precio_bruto: 0,
				precio_igv: 0,
				precio_neto: 0,
			});
		}
		
		void callAPI(codeClient, listaProducto);

	}, [codeClient, isResumeOrder, state.products]);

	const empty = (): void => {

		setProducts([]);
		dispatch({ type: 'TOTAL', payload: 0 });
		setResume(defaultValue);
		dispatchGlobal({ type: 'CART', payload: {} });
	}

	const handleClick = (): void => {

		const { montominimo, isTop } = state.client;
		const price = roundDecimals(total, 5);

		if (price < montominimo && !isTop) return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: `El monto minimo es: ${formatDecimals({ n: montominimo })}`});

		dispatch({ type: 'TOTAL', payload: price });
		setViews(Views.voucher);
	}

	return <OrderBoxPage
		products={products}
		empty={empty}
		resume={resume}
		handleClick={handleClick}
	/>
}

export default OrderBox;