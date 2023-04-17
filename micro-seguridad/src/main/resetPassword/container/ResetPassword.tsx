// 1. librerias
import { useState, useContext } from 'react';

// 2. components
import ResetPasswordPage from '../components/ResetPasswordPage';

// 3. iconos
import { FaAt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from 'react-icons/vsc';

// 4. hooks
import { useForm } from '../../../hooks/hookForm/useForm';

// 5.- servicios
import { user } from '../../../services/user';

// 6.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 7. utils
import { validateEmail } from '../../../helpers/utils';

// 8. Interfaces
export type RequeridFields = 'email';
export interface Model {
	email: string;
}

export interface MessageModal {
	icon: JSX.Element;
	title: string;
	message: string;
	idModal: number;
	isCheck: boolean;
}

const ResetPassword = (): JSX.Element => {

	const { dispatch } = useContext(GlobalContext);

	const [isOpenModal, setIsOpenModel] = useState<boolean>(false);
	const [messageModal, setMessageModal] = useState<MessageModal>({
		icon: <></>,
		title: '',
		message: '',
		idModal: 0,
		isCheck: false,
	});
	const { handleSubmit, validateFields, errors, handleChange } = useForm<
		Model,
		RequeridFields
	>();

	const [form, setForm] = useState<Model>({ email: '' });
	
	const onSubmit = async (model: object): Promise<void> => {

		const newModel = model as Model;
		const isError: boolean = validateFields(newModel, ['email']);
		const isEmail = validateEmail(newModel.email);

		if (isError) return;

		setIsOpenModel(true);

		if (!isEmail) return setMessageModal({
			icon: <FaAt color='#DBDEDF' size={45} />,
			title: 'Credenciales inválidas',
			message: 'El correo ingresado no es válido',
			idModal: 1,
			isCheck: false,
		});

		dispatch({ type: 'IS_LOADING', payload: true });

		const result = await user.changePassword(newModel.email);
		
		dispatch({ type: 'IS_LOADING', payload: false });
		
		if (result.status === 200) return setMessageModal({
			icon: <AiOutlineMail size={45} color="#DDDFE0" />,
			title: `¡${result.message}!`,
			message: 'En breve recibirás un correo con tu contraseña',
			idModal: 1,
			isCheck: true,
		});

		if (result.status === 500) return setMessageModal({
			icon: <></>,
			title: 'No se pudo procesar su solicitud',
			message: 'Ocurrio un error',
			idModal: 2,
			isCheck: false,
		});

		setMessageModal({
			icon: <>
				<FaAt
					color='#DBDEDF'
					size={25} style={{ top: '10px', left: '15px' }}
					className='position-absolute'
				/>
				<VscLock color='#DBDEDF' size={25} />
			</>,
			title: 'Credenciales inválidas',
			message: `${result.message}`,
			idModal: 3,
			isCheck: false,
		});
	}

	return <ResetPasswordPage
		handleSubmit={handleSubmit}
		onSubmit={onSubmit}
		handleChange={handleChange}
		errors={errors}
		form={form}
		setForm={setForm}
		isOpenModal={isOpenModal}
		setIsOpenModel={setIsOpenModel}
		messageModal={messageModal}
	/>
}

export default ResetPassword;