// 1.- Librerias
import { useState, useEffect, useContext } from 'react';

// 2.- Componentes
import SummaryPage from '../components/SummaryPage';

// 3.- context
import { OrderBoxContext } from '../OrderBoxProvider';
import { GlobalContext } from '../../../context/GlobalProvider';

// 4.- service
import { orders } from '../../../service/orders';

// 5.- icons
import { AiFillCheckCircle } from "react-icons/ai";

// 6.- utils
import { alert } from '../../../helpers/utils';

// 7.- utils
import { Product } from '../../../helpers/interface';

interface Props {
    setViews: (value: number) => void;
}

export interface Modal {
	icon: JSX.Element;
	isActive: boolean;
	title: string;
	text1: string;
	text2: string;
	isCheck: boolean;
}

const OrderBox = ({ setViews }: Props): JSX.Element => {

	const { state:{ body }, dispatch } = useContext(OrderBoxContext);
	const { state:{ products, detailOrder }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [dataProducts, setDataProducts] = useState<Product[]>([]);
	const [subTotal, setSubTotal] = useState<number>(0);
	const [modal, setModal] = useState<Modal>({
		icon: <></>, isActive: false,
		isCheck: false, title: '',
		text1: '', text2: '',
	});

	useEffect(() => {

		if (Object.keys(products).length === 0) return;

		const data = Object.values(products);
		const total = data.reduce((cont, v) => { cont += v.price; return cont }, 0);

		setSubTotal(total);
		setDataProducts(data);

	}, [products]);

	const generateDraft = async (): Promise<void> => {

		const { codigo_cliente:codigoCliente, lista_producto:listaProducto } = body;
		const { numped } = detailOrder;

		dispatchGlobal({ type: 'IS_LOADING', payload: true });
		
		const result = await orders.generateDraft(detailOrder.estado_roxfarma_abrev === 'BR'
			? { codigo_cliente: codigoCliente, lista_producto: listaProducto, id_borrador: numped }
			: { codigo_cliente: codigoCliente, lista_producto: listaProducto }
		);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

		const { message, data } = result;

		dispatch({ type: 'BODY', payload: { ...body, id_borrador: data.lista } });

		setModal({
			icon: <AiFillCheckCircle size={46} color="#3FA96B" fill="#3FA96B" stroke="#3FA96B" />,
			isActive: true,
			isCheck: true,
			title: `¡${message}!`,
			text1: 'Se ha generado un borrador si desea editarlo puede ir al Historico de Pedidos',
			text2: '¿Desea enviar con el pedido?'
		});
	}
	
	return <SummaryPage
		setViews={setViews}
		generateDraft={generateDraft}
		setModal={setModal}
		modal={modal}
		dataProducts={dataProducts}
		subTotal={subTotal}
	/>;
};

export default OrderBox;