// 1. librerias
import { useState, useEffect, useCallback, useContext, ChangeEvent } from 'react';

// 2. components
import NewOrdersPage from '../components/NewOrdersPage';

// 3.- servicios
import { products, BodySearchProduct } from '../../../service/products';

// 4.- interface
import { Product } from '../../../service/interfaces';
import { OptionsBadge } from '../../../layauts/Badge';

// 5.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 6.- utils
import { RowPerPage } from '../../products/utils';
import { alert } from '../../../helpers/utils';
import { IDbadges } from '../utils';

// 7.- hooks
import { useDebounced } from '../../../hooks/useDebounced';

export interface DataProduct extends Product {
	precioTotal: number;
	cantidad: number;
}

const NewOrders = (): JSX.Element => {

	const { state, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [data, setData] = useState<DataProduct[]>([]);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [total, setTotal] = useState<number>(0);
	const [valueRowsPerPage, setValueRowsPerPage] = useState<number>(RowPerPage.value);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});

	const textSearchDebounced = useDebounced(valueSearch, 1000);

	const callAPI = useCallback(async (body: BodySearchProduct) => {

		dispatchGlobal({ type: 'IS_LOADING', payload: true });
		
		const result = await products.searchProduct(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

		setTotal(result.total ?? 0);

		if (result.data.length === 0) {

			setData([]);
			return setIsOpenModal(true);
		}

		const dataProducts = result.data.map((v: Product) => ({
			...v,
			precioTotal: state.products[v.idProducto] !== undefined ? state.products[v.idProducto].price : 0,
			cantidad: state.products[v.idProducto] !== undefined ? state.products[v.idProducto].count : 0,
		}));

		setData(dataProducts);

	}, []);

	useEffect(() => {

		const { client } = state;

		const body = {
			search: textSearchDebounced,
			type,
			rowsPerPage: valueRowsPerPage,
			page: 1,
			cliente_codigo: client.codigo,
		}

		void callAPI(body);

	}, [textSearchDebounced]);

	const search = (e: ChangeEvent<HTMLInputElement>): void => {

		let type = 'nombre';

		badgeData.id === IDbadges.code && (type = 'codigo-abrev');
		
		const text: string = e.target.value;

		setValueSearch(text);
		setType(type);
	}

	const rowsPerPage = (n: number): void => {

		const { client } = state;

		void callAPI({ page: 1, rowsPerPage: n, search: valueSearch, type, cliente_codigo: client.codigo });
		setValueRowsPerPage(n);
	}

	const page = (n: number): void => {

		const { client } = state;

		void callAPI({ page: n, rowsPerPage: valueRowsPerPage, search: valueSearch, type, cliente_codigo: client.codigo });
	}

	return <NewOrdersPage
		data={data}
		isOpenModal={isOpenModal}
		setIsOpenModal={setIsOpenModal}
		total={total}
		rowsPerPage={rowsPerPage}
		page={page}
		search={search}
		valueSearch={valueSearch}
		setBadgeData={setBadgeData}
		setData={setData}
	/>
}

export default NewOrders;