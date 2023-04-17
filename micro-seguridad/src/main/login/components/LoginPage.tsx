// 1.- librerias
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 2.- components
import Form from '../../../layauts/form/Form';
import TextField from '../../../layauts/textField/TextField';
import Button from '../../../layauts/button/Button';
import Checkbox from '../../../layauts/checkbox/Checkbox';
import Modal from '../../../layauts/modal/Modal';
import CotainerIcon from '../../../layauts/cotainerIcon/CotainerIcon';

// 3.- interfaces
import { HandleSubmit, HandleChange } from '../../../hooks/hookForm/interface';
import { Model, RequeridFields, Modal as IModal, PasswordParametersError } from '../container/Login';

// 4.- estilos
import { Container, Title, ContainerForm, TitleModal, TextModal } from '../styled';

// 5.- iconos
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";

// 6.- theme
import { theme } from '../../../theme/theme';

interface Props {
	handleSubmit: HandleSubmit<Model>;
	onSubmit: (v: object) => Promise<void>;
	handleChange: HandleChange<Model>;
	errors: RequeridFields[];
	showPassword: boolean;
	setShowPassword: (value: boolean) => void;
	form: Model;
	setForm: (state: Model) => void;
	handleChecked: (value: ChangeEvent<HTMLInputElement>) => void;
	isChecked: boolean;
	modal: IModal;
	setModal: (value: IModal) => void;
	passwordSuccess: PasswordParametersError;
}

const LoginPage = ({ handleSubmit, onSubmit, handleChange, errors, showPassword, setShowPassword, form, setForm, handleChecked, isChecked, modal, setModal, passwordSuccess }: Props): JSX.Element => {

	const history = useNavigate();

	return (
		<Container className='d-flex flex-column justify-content-center align-items-center'>
			<div className='w-100 col-12 text-sm-center'>
				<Title className='mb-4'>Bienvenid@ de nuevo!</Title>
			</div>

			<div className='col-12 col-sm-7 col-lg-6 col-xl-4 w-100'>
				<ContainerForm>
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
							classes="mb-3"
							icon={<AiOutlineUser size={25} color={theme.primary} />}
							edge="start"
							value={form.email}
						/>

						<TextField
							type={!showPassword ? 'password' : 'text'}
							placeholder='Password'
							name='password'
							handleChange={e => handleChange(e, setForm, form)}
							isFull={true}
							classesContainerInput='input'
							isError={errors.includes('password') || !passwordSuccess.isPassword}
							classes="mb-4"
							icon={<BiLockAlt size={25} color={theme.primary} />}
							icon2={
								showPassword
								? <BsEye size={25} onClick={() => setShowPassword(false)} color={theme.primary} />
								: <BsEyeSlash size={25} onClick={() => setShowPassword(true)} color={theme.primary} />
							}
							edge="start"
							edge2="end"
							helperText={!passwordSuccess.isPassword ? passwordSuccess.message : ''}
							colorHelperText="#D32F2F"
							weightHelperText='bold'
							value={form.password}
						/>

						<Button
							type='submit'
							fullWidth={true}
							classes='btn mb-4'
						>iniciar sesión</Button>
						
						<div className='d-flex justify-content-between align-items-center checkbox'>
							<Checkbox
								handleChange={handleChecked}
								id='remember-user'
								name='remember'
								value='checked'
								isChecked={isChecked}
							>Recordar usuario</Checkbox>

							<p
								className='text-right ml-3 pointer font-weight-bold'
								style={{ color: '#4F5A84' }}
								onClick={() => history('/recuperar-contrasena')}
							>Olvidé mi contraseña</p>
						</div>
					</Form>
				</ContainerForm>
			</div>

			<Modal
				closeModal={value => setModal({
					textModal: '',
					isActive: value,
					icon: <></>,
				})}
				textBtn="Entendido"
				open={modal.isActive}
			>
				<CotainerIcon
					icon={modal.icon}
				/>

				<TitleModal className='text-center'>Credenciales inválidas</TitleModal>

				<TextModal
					className='mb-4 text-center'
				>{modal.textModal}</TextModal>
			</Modal>
		</Container>
	);
}

export default LoginPage;