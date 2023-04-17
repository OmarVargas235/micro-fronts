// 1. librerias
import { useContext, useEffect } from 'react';

// 2. components
import CustomerDetailPage from '../components/CustomerDetailPage';

// 3. context
import { GlobalContext } from '../../../context/GlobalProvider';

// 4.- utils
import { defaultDetailOrder } from '../../../helpers/utils';

const CustomerDetail = (): JSX.Element => {

	const { state:{ client }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	useEffect(() => {

		dispatchGlobal({ type: 'CART', payload: {} });
		dispatchGlobal({ type: 'DETAIL_ORDER', payload: JSON.parse(defaultDetailOrder) });

	}, []);

	return <CustomerDetailPage
		data={client}
	/>
}

export default CustomerDetail;