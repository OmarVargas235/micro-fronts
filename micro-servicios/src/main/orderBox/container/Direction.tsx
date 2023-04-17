// 1.- Librerias
import { useState, useEffect, useContext } from 'react';

// 2.- components
import ModalDirectionPage from '../components/DirectionPage';

// 3.- interfaces
import { Direction } from '../../../service/interfaces';

// 4.- context
import { OrderBoxContext } from '../OrderBoxProvider';

const requeridFields = ['direccion_cliente'] as const;
export type RequeridFields = typeof requeridFields[number];

const ModalDirection = (): JSX.Element => {

    const { state:{ directions }, dispatch } = useContext(OrderBoxContext);

    const [indexSelected, setIndexSelected] = useState(-1);

    useEffect(() => {

        if (directions.length > 1 || directions.length === 0) return;

        const [direction] = directions;

        dispatch({ type: 'DIRECTION', payload: direction.codigo });
        setIndexSelected(0);

    }, [directions]);

    const selectedDirection = (model: Direction, index: number): void => {

        dispatch({ type: 'DIRECTION', payload: model.codigo });
        setIndexSelected(index);
    }

    return <ModalDirectionPage
        directions={directions}
        selectedDirection={selectedDirection}
        indexSelected={indexSelected}
    />
}

export default ModalDirection;