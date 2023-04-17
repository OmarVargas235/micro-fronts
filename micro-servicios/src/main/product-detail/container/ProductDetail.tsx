// 1. librerias
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// 2. components
import ProductDetailPage from '../components/ProductDetailPage';

// 3.- servicios
import { products } from '../../../service/products';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- utils
import { alert, defaultValue } from '../../../helpers/utils';

// 5.- interface
import { DeatilProduct } from '../../../service/interfaces';

const ProductDetail = (): JSX.Element => {

	const params = useParams();

	const { dispatch:dispatchGlobal } = useContext(GlobalContext);

	const [data, setData] = useState<DeatilProduct>(defaultValue);
	
	// Obtener data del detalle del producto
	useEffect(() => {
		
		const id = params.id as unknown as number;

		async function callAPI(): Promise<void> {

			dispatchGlobal({ type: 'IS_LOADING', payload: true });

			const result = await products.getProduct(id, "0");

			dispatchGlobal({ type: 'IS_LOADING', payload: false });

			if (result.status !== 200 || result.data === null)
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

			setData(result.data);
		}

		void callAPI();

	}, []);

	return <ProductDetailPage
		data={data}
	/>
}

export default ProductDetail;