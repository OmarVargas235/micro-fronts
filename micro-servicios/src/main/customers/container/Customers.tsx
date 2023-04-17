// 1. librerias
import { useState, useEffect, useContext, ChangeEvent, useCallback } from 'react';

// 2. components
import CustomersPage from '../components/CustomersPage';

// 3. utils
import { alert } from '../../../helpers/utils';
import { RowPerPage, IDbadges } from '../utils';

// 4. context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- servicios
import { customer } from '../../../service/customer';

// 6. Interfaces
import { Customer } from '../../../helpers/interface';
import { OptionsBadge } from '../../../layauts/Badge';

// 7.- hooks
import { useDebounced } from '../../../hooks/useDebounced';

const Customers = (): JSX.Element => {

	const { dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [data, setData] = useState<Customer[]>([]);
	const [valueSearch, setValueSearch] = useState<string>('');
	const [total, setTotal] = useState<number>(0);
	const [valueRowsPerPage, setValueRowsPerPage] = useState<number>(RowPerPage.value);
	const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});

	const textSearchDebounced = useDebounced(valueSearch, 1000);

	const callAPI = useCallback(async (body) => {

		dispatchGlobal({ type: 'IS_LOADING', payload: true });
		
		const result = await customer.getCustomer(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

		const { data } = result;

		setTotal(data.total);

		if (data.clientes.length === 0) {

			setData([]);
			return setIsOpenModal(true);
		}

		setData(data.clientes);

	}, []);

	useEffect(() => {

		const body = {
			codigo: badgeData.id === IDbadges.code ? textSearchDebounced : '',
			nombrecomercial: badgeData.id === IDbadges.name ? textSearchDebounced : '',
			razonsocial: badgeData.id === IDbadges.businessName ? textSearchDebounced : '',
		}

		void callAPI({ ...body, page: 1, rowsPerPage: valueRowsPerPage });

	}, [textSearchDebounced]);

	const search = (e: ChangeEvent<HTMLInputElement>): void => {
		
		const text: string = e.target.value;
		setValueSearch(text);
	}

	const rowsPerPage = (n: number): void => {

		const body = {
			codigo: badgeData.id === IDbadges.code ? valueSearch : '',
			nombrecomercial: badgeData.id === IDbadges.name ? valueSearch : '',
			razonsocial: badgeData.id === IDbadges.businessName ? valueSearch : '',
		}
		
		void callAPI({ page: 1, rowsPerPage: n, ...body });
		setValueRowsPerPage(n);
	}

	const page = (n: number): void => {

		const body = {
			codigo: badgeData.id === IDbadges.code ? valueSearch : '',
			nombrecomercial: badgeData.id === IDbadges.name ? valueSearch : '',
			razonsocial: badgeData.id === IDbadges.businessName ? valueSearch : '',
		}

		void callAPI({ page: n, rowsPerPage: valueRowsPerPage, ...body });
	}

	return <CustomersPage
		isOpenModal={isOpenModal}
		setIsOpenModal={setIsOpenModal}
		data={data}
		valueSearch={valueSearch}
		search={search}
		setBadgeData={setBadgeData}
		total={total}
		rowsPerPage={rowsPerPage}
		page={page}
	/>
}

export default Customers;