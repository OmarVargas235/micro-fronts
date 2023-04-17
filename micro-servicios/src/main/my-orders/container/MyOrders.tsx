// 1. librerias
import { useState, useEffect, useCallback, useContext, ChangeEvent } from 'react';

// 2. components
import MyOrdersPage from '../components/MyOrdersPage';

// 3. servicios
import { orders, BodyGetListOrders } from '../../../service/orders';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- utils
import { alert } from '../../../helpers/utils';
import { RowPerPage, IDbadges } from '../utils';

// 6.- interfaces
import { OptionsBadge } from '../../../layauts/Badge';
import { ListOrders } from '../../../service/interfaces';

// 7.- hooks
import { useDebounced } from '../../../hooks/useDebounced';

export interface ListOrder extends ListOrders {
	nmr: number;
	title: string;
	badge: string;
}

interface State { text: string; code: 'RE' | 'PE' | 'AP' | 'BR' };

const states: State[] = [{ text: 'aprobado', code: 'AP' }, { text: 'pendiente', code: 'PE' }, { text: 'rechazado', code: 'RE' }, { text: 'borrador', code: 'BR' }];

const MyOrders = (): JSX.Element => {

	const { state:{ user }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [data, setData] = useState<ListOrder[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [valueRowsPerPage, setValueRowsPerPage] = useState<number>(RowPerPage.value);
	const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});

	const searchTextDebounced = useDebounced(valueSearch, 1000);

	const callAPI = useCallback(async (body: BodyGetListOrders) => {

		dispatchGlobal({ type: 'IS_LOADING', payload: true });

		const result = await orders.getListOrders(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

		setTotal(result.total);

		if (result.data.length === 0) {

			setData([]);
			setValueRowsPerPage(RowPerPage.value);
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message:'Pedido no encontrado' });
		}

		setData(result.data.map(v => ({
			...v,
			nmr: Number(v.numped),
			title: v.cliente_nombre_comercial,
			badge: v.estado_roxfarma,
		})));

	}, []);

	useEffect(() => {

		const state = states.find(v => v.text.includes(searchTextDebounced.toLocaleLowerCase()));
		const isStateEmpty = valueSearch.length === 0 || valueSearch.length === 1 || state?.code === undefined;

		const body = {
			correo: user.correo,
			numpedido: badgeData.id === IDbadges.nro_order ? searchTextDebounced : '',
			nombre_cliente: badgeData.id === IDbadges.name ? searchTextDebounced : '',
			estado: badgeData.id === IDbadges.state
				? (isStateEmpty? '' : state?.code) : '',
			rowsPerPage: valueRowsPerPage,
			page: 1
		}

		void callAPI(body);

	}, [searchTextDebounced]);

	const search = (e: ChangeEvent<HTMLInputElement>): void => {
		
		const text: string = e.target.value;
		setValueSearch(text);
	}

	const rowsPerPage = (n: number): void => {

		const state = states.find(v => v.text.includes(valueSearch.toLocaleLowerCase()));
		const isStateEmpty = valueSearch.length === 0 || valueSearch.length === 1 || state?.code === undefined;

		const body = {
			correo: user.correo,
			numpedido: badgeData.id === IDbadges.nro_order ? valueSearch : '',
			nombre_cliente: badgeData.id === IDbadges.name ? valueSearch : '',
			estado: badgeData.id === IDbadges.state
				? (isStateEmpty ? '' : state?.code) : '',
			rowsPerPage: n,
			page: 1
		}

		void callAPI(body);
		setValueRowsPerPage(n);
	}

	const page = (n: number): void => {

		const state = states.find(v => v.text.includes(valueSearch.toLocaleLowerCase()));
		const isStateEmpty = valueSearch.length === 0 || valueSearch.length === 1 || state?.code === undefined;

		const body = {
			correo: user.correo,
			numpedido: badgeData.id === IDbadges.nro_order ? valueSearch : '',
			nombre_cliente: badgeData.id === IDbadges.name ? valueSearch : '',
			estado: badgeData.id === IDbadges.state
				? (isStateEmpty ? '' : state?.code) : '',
			rowsPerPage: valueRowsPerPage,
			page: n
		}

		void callAPI(body);
	}

	return <MyOrdersPage
		data={data}
		total={total}
		search={search}
		valueSearch={valueSearch}
		rowsPerPage={rowsPerPage}
		page={page}
		setBadgeData={setBadgeData}
	/>
}

export default MyOrders;