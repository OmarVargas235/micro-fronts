// 1. librerias
import { useNavigate } from 'react-router-dom';

// 2. components
import Form from '../../../layauts/form/Form';
import TextField from '../../../layauts/textField/TextField';
import Button from '../../../layauts/button/Button';
import Modal from '../../../layauts/modal/Modal';
import CotainerIcon from '../../../layauts/cotainerIcon/CotainerIcon';

// 3. interfaces
import { HandleSubmit, HandleChange } from '../../../hooks/hookForm/interface';
import { Model, RequeridFields, MessageModal } from '../container/ResetPassword';

// 4. estilos
import { Container, Title, Text, ContainerForm } from '../styled';

// 5. iconos
import { AiOutlineUser } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

// 6.- theme
import { theme } from '../../../theme/theme';

interface Props {
	handleSubmit: HandleSubmit<Model>;
	onSubmit: (v: object) => Promise<void>;
	handleChange: HandleChange<Model>;
	errors: RequeridFields[];
	form: Model;
	setForm: (state: Model) => void;
	isOpenModal: boolean;
	setIsOpenModel: (value: boolean) => void;
	messageModal: MessageModal;
}

const ResetPasswordPage = ({ handleSubmit, onSubmit, handleChange, errors, form, setForm, isOpenModal, setIsOpenModel, messageModal }: Props): JSX.Element => {

	const history = useNavigate();

	return (
		<Container className='d-flex flex-column justify-content-center align-items-center'>
			<div className='container-arrow-left'>
				<BsArrowLeftShort
					className='mr-3 pointer'
					size={35}
					onClick={() => history('/login')}
				/>
			</div>

			<Title>Recuperar contraseña</Title>
			
			<ContainerForm className='mt-4'>
				<Form
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
				>
					<TextField
						placeholder='Correo electrónico'
						name='email'
						handleChange={e => handleChange(e, setForm, form)}
						isFull={true}
						classesContainerInput='input'
						isError={errors.includes('email')}
						classes="mb-5"
						icon={<AiOutlineUser size={25} color={theme.primary} />}
						edge="start"
						value={form.email}
					/>

					<Button
						type='submit'
						fullWidth={true}
						classes='btn'
					>Enviar</Button>
				</Form>
			</ContainerForm>

			<Modal
				closeModal={value => setIsOpenModel(value)}
				textBtn='Entendido'
				open={isOpenModal}
			>
				<CotainerIcon
					icon={messageModal.icon}
					isCheck={messageModal.isCheck}
				/>
				
				<Title
					className='text-center w-100'
					style={{ color: '#4B4B4B' }}
				>{messageModal.title}</Title>

				<Text
					className='mb-5 text-center w-100'
				>{messageModal.message}</Text>
			</Modal>
		</Container>
	);
}

export default ResetPasswordPage;