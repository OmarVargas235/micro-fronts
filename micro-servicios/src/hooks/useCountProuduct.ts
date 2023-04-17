// 1.- librerias
import { useContext, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';

// 2.- context
import { GlobalContext } from '../context/GlobalProvider';

// 3.- interface
import { Product as IProduct } from '../helpers/interface';
import { DeatilProduct } from '../service/interfaces';

// 4.- utils
import { alert, deleteMap } from '../helpers/utils';

interface Props {
    data: DeatilProduct;
    setPrice: (n: number) => void;
    setTotal: (n: number) => void;
}

interface Return {
    handleClick: (isPlus:boolean) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useCountProuduct = ({ data, setPrice, setTotal }: Props): Return => {

    const { state, dispatch:dispatchGlobal } = useContext(GlobalContext);

    const search = useLocation().search;

    const handleClick = (isPlus:boolean): void => {

		const { products:productsGlobal } = state;
		const products: Record<number, IProduct> = JSON.parse(JSON.stringify(productsGlobal));
		let count = 0;

		if (products[data.idProducto] !== undefined) {

			count = isPlus ? ++products[data.idProducto].count : --products[data.idProducto].count;

			if (count === 0) {

				const id = search.split('=')[1] as unknown as number;
				const data = deleteMap<Record<number, IProduct>>(products, id);

				dispatchGlobal({ type: 'CART', payload: data });

				setPrice(0);
				return setTotal(0);
			}

			if (count > Math.trunc(data.stock))
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

			count !== 0 && (products[data.idProducto].price = products[data.idProducto].count * data.precio);
		
		} else {

			const stock = Math.trunc(data.stock);

			if (!isPlus) return;

			if (stock === 0)
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

			products[data.idProducto] = { count: 1, price: data.precio, name: data.nombre, presentation: data.presentacion, id: data.idProducto, stock, priceProduct: data.precio, code: data.codigo };
		}

		(count >= 0 && count <= Math.trunc(data.stock)) && dispatchGlobal({ type: 'CART', payload: products });
	}

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {

		const { products:productsGlobal } = state;

		const value = e.target.value;
		const products: Record<number, IProduct> = JSON.parse(JSON.stringify(productsGlobal));
		
		if (value.length === 0 || value === '0') {

			const id = search.split('=')[1] as unknown as number;
			const data = deleteMap<Record<number, IProduct>>(products, id);

			dispatchGlobal({ type: 'CART', payload: data });
			setPrice(0);
			return setTotal(value === '0' ? 0 : -1);
		}

		const n = Math.abs(Number(value));
		const stock = Math.trunc(data.stock);

		if (n > stock)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay stock suficiente' });

		if (stock === 0)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

		setTotal(n);

		const isExistProduct = products[data.idProducto] !== undefined;

		if (isExistProduct) {

			const price = data.precio * n;
	
			products[data.idProducto].count = n;
			products[data.idProducto].price = Number(price.toFixed(2));
		
		} else {

			products[data.idProducto] = { count: n, price: data.precio*n, name: data.nombre, presentation: data.presentacion, id: data.idProducto, stock, priceProduct: data.precio, code: data.codigo };
		}
		
		dispatchGlobal({ type: 'CART', payload: products });
	}

    return { handleClick, handleChange };
}