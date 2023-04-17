// 1. librerias
import { useState, useEffect, useContext, useCallback, ChangeEvent } from 'react';

// 2. components
import ProductsPage from '../components/ProductsPage';

// 3.- servicios
import { products } from '../../../service/products';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- interface
import { Product } from '../../../service/interfaces';
import { OptionsBadge } from '../../../layauts/Badge';

// 6.- utils
import { alert } from '../../../helpers/utils';
import { RowPerPage, IDbadges } from '../utils';

// 7.- hooks
import { useDebounced } from '../../../hooks/useDebounced';

const Products = (): JSX.Element => {

	const { dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [data, setData] = useState<Product[]>([]);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [total, setTotal] = useState<number>(0);
	const [valueRowsPerPage, setValueRowsPerPage] = useState<number>(RowPerPage.value);
	const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});

	const searchText = useDebounced(valueSearch, 1000);

	const callAPI = useCallback(async (body) => {

		dispatchGlobal({ type: 'IS_LOADING', payload: true });
		
		const result = await products.searchProduct(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });
		
		setTotal(result.total);

		if (result.data.length === 0) {

			setData([]);
			setValueRowsPerPage(RowPerPage.value);
			return setIsOpenModal(true);
		}

		setData(result.data);

	}, []);

	useEffect(() => {

		const body = searchText.length === 0
		? { page: 1, rowsPerPage: valueRowsPerPage, cliente_codigo: '' }
		: {
			search: searchText,
			type,
			rowsPerPage: valueRowsPerPage,
			page: 1,
			cliente_codigo: ''
		}

		void callAPI(body);

	}, [searchText]);

	const search = (e: ChangeEvent<HTMLInputElement>): void => {

		let type = 'nombre';
		
		(badgeData.id === IDbadges.code) && (type = 'codigo');
		(badgeData.id === IDbadges.codeAbrev) && (type = 'codigo-abrev');
		
		const text: string = e.target.value;

		setValueSearch(text);
		setType(type);
	}

	const rowsPerPage = (n: number): void => {

		void callAPI({ page: 1, rowsPerPage: n, type, search: valueSearch, cliente_codigo: '' });
		setValueRowsPerPage(n);
	}

	const page = (n: number): void => {

		void callAPI({ page: n, rowsPerPage: valueRowsPerPage, type, search: valueSearch, cliente_codigo: '' });
	}

	return <ProductsPage
		isOpenModal={isOpenModal}
		setIsOpenModal={setIsOpenModal}
		data={data}
		setBadgeData={setBadgeData}
		search={search}
		valueSearch={valueSearch}
		total={total}
		rowsPerPage={rowsPerPage}
		page={page}
	/>
}

export default Products;