// 1.- librerias
import { useState, useContext } from 'react';

// 2.- components
import CardPage from '../components/CardPage';

// 3.- interfaces
import { Product as IProduct } from '../../../helpers/interface';
import { Lista } from '../../../service/orders';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 5.- utils
import { alert, deleteMap } from '../../../helpers/utils';

interface Props {
    data: Lista;
    empty: () => void;
}

type Product = Record<number, IProduct>;

const Card = ({ data, empty }: Props): JSX.Element => {

    const { state, dispatch:dispatchGlobal } = useContext(GlobalContext);

    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    const deleteProduct = (id: number, isDelete: boolean): void => {
        
        if (!isDelete) return setIsOpenModalDelete(true);

        const products: Product = JSON.parse(JSON.stringify(state.products));
        const data = deleteMap<Product>(products, id);

        dispatchGlobal({ type: 'CART', payload: data });
        setIsOpenModalDelete(false);

        Object.keys(data).length === 0 && empty();
    }

    const handleClick = (isPlus:boolean): void => {

		const { products:productsGlobal } = state;
		const products: Record<number, IProduct> = JSON.parse(JSON.stringify(productsGlobal));
        let count = 0;

        const currentPrice = products[data.id_articulo].price;

        const price = isPlus ? currentPrice + data.precio_venta_unidad : currentPrice - data.precio_venta_unidad;
        count = isPlus ? ++products[data.id_articulo].count : --products[data.id_articulo].count;

        if (count > Math.trunc(data.stock))
            return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'No hay mas stock' });

        count !== 0 && (products[data.id_articulo].price = price);

		(count >= 0 && count <= Math.trunc(data.stock)) && dispatchGlobal({ type: 'CART', payload: products });

        count === 0 && deleteProduct(data.id_articulo, true);
	}

    return <CardPage
        data={data}
        deleteProduct={deleteProduct}
        handleClick={handleClick}
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
    />
}

export default Card;