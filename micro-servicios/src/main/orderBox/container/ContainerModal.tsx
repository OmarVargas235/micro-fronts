// 1.- Librerias
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 2.- componentes
import ContainerModalsPage from '../components/ContainerModalsPage';

// 3.- interfaces
import { Modal as IModal } from '../container/Summary';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';
import { OrderBoxContext } from '../OrderBoxProvider';

// 5.- servicios
import { orders } from '../../../service/orders';

// 6.- utils
import { alert } from '../../../helpers/utils';

// 7.- icons
import { FaBoxOpen } from "react-icons/fa";

interface Props {
    modal: IModal;
    setModal: (value: IModal) => void;
}

const ContainerModal = ({ modal, setModal }: Props): JSX.Element => {

    const { state:{ body } } = useContext(OrderBoxContext);
    const { dispatch:dispatchGlobal } = useContext(GlobalContext);

    const history = useNavigate();

    const closeModal = (): void => {

        setModal({
            title: '',
            text1: '',
            text2: '',
            isActive: false,
            icon: <></>,
            isCheck: false,
        });

        history('/mis-pedidos');
        dispatchGlobal({ type: 'CART', payload: {} });
    }

    const generateOrder = async (): Promise<void> => {

        dispatchGlobal({ type: 'IS_LOADING', payload: true });

		const result = await orders.register(body);

		dispatchGlobal({ type: 'IS_LOADING', payload: false });

		if (result.status !== 200 || result.data === null)
			return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: result.message });

		const { data, message } = result;

		if (data.estado_pedido === 'RE') return setModal({
			icon: <FaBoxOpen size={40} color="#1B88FB" fill="#1B88FB" stroke="#1B88FB" />,
			isActive: true,
			isCheck: false,
			title: data.observacion,
			text1: '',
			text2: '',
		});

		if (data.estado_pedido === undefined) return setModal({
			icon: <FaBoxOpen size={40} color="#1B88FB" fill="#1B88FB" stroke="#1B88FB" />,
			isActive: true,
			isCheck: false,
			title: message,
			text1: '',
			text2: '',
		});

		closeModal();
    }

    return <ContainerModalsPage
        modal={modal}
        setModal={setModal}
        closeModal={closeModal}
        generateOrder={generateOrder}
    />;
}

export default ContainerModal;