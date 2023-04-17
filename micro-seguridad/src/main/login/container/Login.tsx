// 1. librerias
import { useState, useEffect, ChangeEvent, useContext } from 'react';

// 2. components
import LoginPage from '../components/LoginPage';
import { AuthContext } from '../../../auth/AuthProvider';

// 3. utils
import { validateEmail, validatePassword } from '../../../helpers/utils';

// 4. hooks
import { useForm } from '../../../hooks/hookForm/useForm';

// 5. iconos
import { VscLock } from "react-icons/vsc";
import { FaAt } from "react-icons/fa";

// 6. context
import { GlobalContext } from '../../../context/GlobalProvider';

export type RequeridFields = 'email' | 'password';
export interface Model {
	email: string;
	password: string;
}

export interface Modal {
	icon: JSX.Element;
	isActive: boolean;
	textModal: string;
}

export interface PasswordParametersError {
	isPassword: boolean;
	message: string;
}

const Login = (): JSX.Element => {

	const { state:{ countPassword, parametersPassword }, dispatch:dispatchGlobal } = useContext(GlobalContext);
	const { submitLogin } = useContext(AuthContext);

	const { handleSubmit, validateFields, errors, handleChange, setValuesDefault } = useForm<
		Model,
		RequeridFields
	>();

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordSuccess, setPasswordSuccess] = useState<PasswordParametersError>({
		isPassword: true,
		message: '',
	});
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [modal, setModal] = useState<Modal>({
		icon: <></>,
		isActive: false,
		textModal: '',
	});
	const [form, setForm] = useState<Model>({
		email: '',
		password: '',
	});

	// Precargar email
	useEffect(() => {
		
		const data = window.localStorage.getItem('saveEmail');
		const parsetData: Model = data !== null ? { email: data, password: '' } : { email: '', password: '' };

		setForm(parsetData);
		setIsChecked(data !== null);

		setValuesDefault('email', parsetData.email);

		parsetData.email === '' && setIsChecked(false);
		parsetData.email === '' && window.localStorage.removeItem('saveEmail');

	}, []);
	
	const onSubmit = async (model: object): Promise<void> => {

		const newModel = model as Model;

		const isError: boolean = validateFields(newModel, ['email', 'password']);
		const isPasswordSuccess = validatePassword(newModel.password, parametersPassword);
		const isEmail = validateEmail(newModel.email.trim());
		const [minlength, minCapitalization, minLower, minSymbols, , minNums] = parametersPassword;

		setPasswordSuccess({ isPassword: true, message: '' });

		if (!isPasswordSuccess || newModel.password.length < Number(minlength.valor)) return setPasswordSuccess({
			isPassword: false,
			message: `La contraseña debe de tener mas de ${minCapitalization.valor} mayúsculas, mas de ${minLower.valor} minúsculas, mas de ${minNums.valor} números, mas de ${minSymbols.valor} símbolos y debe tener mas de ${minlength.valor} caracteres`
		});

		if (isError) return;

		if (!isEmail) return setModal({
			icon: <FaAt color='#DBDEDF' size={45} />,
			isActive: true,
			textModal: 'El correo ingresado no es válido'
		});

		dispatchGlobal({ type: 'COUNT_PASSWORD', payload: countPassword+1 });

		dispatchGlobal({ type: 'IS_LOADING', payload: true });

		const result = await submitLogin({ ...newModel, email: newModel.email.trim().toLocaleLowerCase() });

		dispatchGlobal({ type: 'IS_LOADING', payload: false });
		
		if (result.status === 201) return;
		if (result.status === 200) return dispatchGlobal({ type: 'COUNT_PASSWORD', payload: 0 });

		setModal({
			icon: <>
				<FaAt
					color='#DBDEDF'
					size={25} style={{ top: '10px', left: '15px' }}
					className='position-absolute'
				/>
				<VscLock color='#DBDEDF' size={25} />
			</>,
			isActive: true,
			textModal: result.message
		});
	}

	const handleChecked = (e: ChangeEvent<HTMLInputElement>): void => {
		
		const isChecked = e.target.checked;

		isChecked
		? window.localStorage.setItem('saveEmail', form.email)
		: window.localStorage.removeItem('saveEmail');

		setIsChecked(isChecked);
	}

	return <LoginPage
		handleSubmit={handleSubmit}
		onSubmit={onSubmit}
		handleChange={handleChange}
		errors={errors}
		showPassword={showPassword}
		setShowPassword={setShowPassword}
		form={form}
		setForm={setForm}
		handleChecked={handleChecked}
		isChecked={isChecked}
		modal={modal}
		setModal={setModal}
		passwordSuccess={passwordSuccess}
	/>
}

export default Login;