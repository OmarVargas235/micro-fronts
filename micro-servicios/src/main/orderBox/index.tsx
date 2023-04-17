// 1.- Librerias
import { useState } from 'react';

// 2.- Componentes
import OrderBoxPage from './container/OrderBox';
import VoucherPage from './container/Voucher';
import Summary from './container/Summary';

// 3.- context
import OrderBoxProvider from './OrderBoxProvider';

// 4.- utils
import { Views } from './utils';

const OrderBox = (): JSX.Element => {

	const [views, setViews] = useState<number>(Views.orderBox);

	return <OrderBoxProvider>
		<>
			{
				views === Views.orderBox && <OrderBoxPage setViews={setViews} />
			}

			{
				views === Views.voucher && <VoucherPage setViews={setViews} />
			}

			{
				views === Views.summary && <Summary setViews={setViews} />
			}
		</>
	</OrderBoxProvider>
};

export default OrderBox;