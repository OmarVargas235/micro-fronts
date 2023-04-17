// 1.- librerias
import { useContext, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

// 2.- components
import CardPage from '../components/CardPage';

// 3.- interface
import { DataProduct } from './NewOrders';
import { Product as IProduct } from '../../../helpers/interface';
import { Product } from '../../../service/interfaces';

// 4.- hooks
import { useWindowDimensions } from '../../../hooks/windowDimensions/useWindowDimensions';

// 5.- utils
import { alert, deleteMap } from '../../../helpers/utils';

// 6.- context
import { GlobalContext } from '../../../context/GlobalProvider';

interface Props {
    data: DataProduct[];
    setData: (v: DataProduct[]) => void;
}

const Card = ({ data, setData }: Props): JSX.Element => {

    const { state, dispatch:dispatchGlobal } = useContext(GlobalContext);

    const codigo = useParams().codigo ?? '';

    const { width } = useWindowDimensions();

    const handleClick = (product: Product, isPlus:boolean): void => {

		const { products:productsGlobal } = state;
		let products: Record<number, IProduct> = JSON.parse(JSON.stringify(productsGlobal));
		let count = 0;

		if (products[product.idProducto] !== undefined) {

			const currentPrice = products[product.idProducto].price;

			const price = isPlus ? currentPrice + product.precio : currentPrice - product.precio;
			count = isPlus ? ++products[product.idProducto].count : --products[product.idProducto].count;

			if (count > Math.trunc(product.stock))
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });
			
			const data = deleteMap(products, product.idProducto);

			count === 0 ? (products = data) : (products[product.idProducto].count = count);
			count !== 0 && (products[product.idProducto].price = price);
		
		} else {

			const stock = Math.trunc(product.stock);

			if (!isPlus) return;

			if (stock === 0)
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

			products[product.idProducto] = { count: 1, price: product.precio, name: product.nombre, presentation: product.presentacion, id: product.idProducto, stock, priceProduct: product.precio, code: product.codigo };
		}

		const newProducts = data.map(v => {

			if (v.idProducto === product.idProducto) {

				const priceTotal = Number(v.precioTotal.toFixed(2));

				const product: DataProduct = {
					...v,
					cantidad: isPlus ? ++v.cantidad : --v.cantidad,
					precioTotal: isPlus ? priceTotal + v.precio : priceTotal - v.precio
				}

				return product;
			}

			return v;
		});

		(count >= 0 && count <= Math.trunc(product.stock)) && dispatchGlobal({ type: 'CART', payload: products });
		(count >= 0 && count <= Math.trunc(product.stock)) && setData(newProducts);
	}

    const handleChange = (e: ChangeEvent<HTMLInputElement>, product: Product): void => {

        const value = e.target.value;
        const n = value === '-1' ? 0 : Math.abs(Number(parseInt(value)));
		const { products:productsGlobal } = state;
		let products: Record<number, IProduct> = JSON.parse(JSON.stringify(productsGlobal));

		if (products[product.idProducto] !== undefined) {

			const { priceProduct } = products[product.idProducto];

			const price = priceProduct * n;

			if (n > Math.trunc(product.stock))
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

            const data = deleteMap(products, product.idProducto);

            n === 0 ? (products = data) : (products[product.idProducto].count = n);
			n !== 0 && (products[product.idProducto].price = price);
		
		} else {

			const stock = Math.trunc(product.stock);

			if (n > Math.trunc(product.stock))
				return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

			n > 0 && (products[product.idProducto] = { count: n, price: product.precio, name: product.nombre, presentation: product.presentacion, id: product.idProducto, stock, priceProduct: product.precio, code: product.codigo });
		}

		const newProducts = data.map(v => {

			if (v.idProducto === product.idProducto) {

                const { count, price } = products[product.idProducto] ?? { count: -1, price: 0 };

				const productData: DataProduct = {
					...v,
					cantidad: count,
					precioTotal: price
				}

				return productData;
			}

			return v;
		});

        (n >= 0 && n <= Math.trunc(product.stock)) && dispatchGlobal({ type: 'CART', payload: products });
		(n >= 0 && n <= Math.trunc(product.stock)) && setData(newProducts);
	}

    return <>
        {	
            data.map((v, index) => (
                <CardPage
                    key={index}
                    data={v}
                    path={`/detalles-producto/${codigo}?id=${v.idProducto}`}
                    width={width}
                    handleClick={handleClick}
                    handleChange={handleChange}
                />
            ))
        }
    </>
}

export default Card;