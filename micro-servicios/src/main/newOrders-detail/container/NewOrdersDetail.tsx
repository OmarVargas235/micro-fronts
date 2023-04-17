// 1. librerias
import {  useState, useEffect, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// 2. components
import NewOrdersDetailPage from '../components/NewOrdersDetailPage';

// 3.- servicios
import { products } from '../../../service/products';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';
import { NewOrdersDetailContext } from '../NewOrdersDetailProvider';

// 5.- interface
import { DeatilProduct } from '../../../service/interfaces';

// 6.- utils
import { alert, defaultValue } from '../../../helpers/utils';

// 7.- hooks
import { useCountProuduct } from '../../../hooks/useCountProuduct';

const NewOrdersDetail = (): JSX.Element => {

	const search = useLocation().search;

    const { state, dispatch:dispatchGlobal } = useContext(GlobalContext);
    const { dispatch } = useContext(NewOrdersDetailContext);

	const [data, setData] = useState<DeatilProduct>(defaultValue);
	const [total, setTotal] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);

	const { handleClick, handleChange } = useCountProuduct({ data, setPrice, setTotal });
	
    const callAPI = useCallback(async (): Promise<void> => {

        const id = search.split('=')[1] as unknown as number;
		const { client } = state;

        dispatchGlobal({ type: 'IS_LOADING', payload: true });
        
        const result = await products.getProduct(id, client.codigo);

        dispatchGlobal({ type: 'IS_LOADING', payload: false });

        if (result.status !== 200 || result.data === null)
            return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

        setData(result.data);
		dispatch({ type: 'CODE_PRODUCT', payload: result.data.codigo });

    }, [search]);

    useEffect(() => {
        
        if (search === '') return;

        void callAPI();

    }, [search]);

    useEffect(() => {

        const { products } = state;

		if (Object.keys(products).length === 0) return;

        const id = search.split('=')[1] as unknown as number;
        const countProduct = products[id];

		if (countProduct === undefined) return;

        setTotal(countProduct.count);
        setPrice(countProduct.price);

    }, [state.products]);

	return <NewOrdersDetailPage
		data={data}
        total={total}
        price={price}
        handleClick={handleClick}
		handleChange={handleChange}
	/>
}

export default NewOrdersDetail;