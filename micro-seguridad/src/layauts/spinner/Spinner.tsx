// 1.- Librerias
import { useContext } from 'react';

// 2.- Estilos
import { Container } from './styled';

// 3.- Context
import { GlobalContext } from '../../context/GlobalProvider';

interface Props {
    isLoading?: boolean;
}

const Spinner = ({ isLoading=false }: Props): JSX.Element => {

    const { state } = useContext(GlobalContext);

    return <>
        {
            (state !== undefined ? state.loading : isLoading) ? <Container className='position-fixed w-100 min-h-100 d-flex justify-content-center align-items-center'>
                <div className="ml-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Container> : null
        }
    </>;
}

export default Spinner;