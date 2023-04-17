// 1. librerias
import { useState, useEffect, useContext } from 'react';

// 2. components
import VoucherPage from '../components/VoucherPage';

// 3.- hooks
import { useForm } from '../../../hooks/hookForm/useForm';

// 4.- utils
import { currentDate, Views } from '../utils';
import { alert } from '../../../helpers/utils';

// 4.- context
import { GlobalContext } from '../../../context/GlobalProvider';
import { OrderBoxContext } from '../OrderBoxProvider';
import { IOption } from '../../../layauts/select/Select';

interface Props {
	setViews: (value: number) => void;
}

export interface Model {
	fecha_entrega: string;
	horario_atencion: string;
	observation: string;
}

const requeridFields = ['fecha_entrega', 'horario_atencion'] as const;
export type RequeridFields = typeof requeridFields[number];

const Voucher = ({ setViews }: Props): JSX.Element => {

	const { state:{ schedule, summary, direction }, dispatch } = useContext(OrderBoxContext);
	const { state:{ user, location, client, products }, dispatch:dispatchGlobal } = useContext(GlobalContext);

	const { handleSubmit, handleChange, handleChangeTextarea, validateFields, setSelect, errors, setValuesDefault } = useForm<Model, RequeridFields>();

	const [horarios, setHorarios] = useState<IOption[]>([{label: '--- Seleccionar ---', value: -1}]);
	const [form, setForm] = useState<Model>({
        fecha_entrega: currentDate(),
        horario_atencion: '',
		observation: '',
    });

	useEffect(() => setValuesDefault('fecha_entrega', currentDate()), [setValuesDefault]);

	useEffect(() => {

		if (horarios.length === 1) return;

		const houer = horarios.find(v => v.value === form.horario_atencion);

		houer !== undefined && dispatch({ type: 'SUMMARY', payload: { ...summary, deadline: form.fecha_entrega, officeHours: houer.label, observation: form.observation } });

	}, [form, horarios]);

	useEffect(() => {

		if (form.fecha_entrega.length === 0) return;

		setForm(state => ({
			...state,
			fecha_entrega: new Date(form.fecha_entrega).getTime() < new Date( currentDate() ).getTime()
				? currentDate()
				: form.fecha_entrega
		}));

	}, [form.fecha_entrega]);

	useEffect(() => {

		const data: IOption[] = schedule.map((v, index) => ({
			label: v.nom_hora,
			value: v.cod_hora
		}));

		setHorarios(data);

	}, [schedule]);

	const handleSelect = (value: number | string, name: string): void => {

        setSelect(name, value, setForm, form);
	}

    const onSubmit = async (model: object): Promise<void> => {

		const newModel = model as Model;
        
        const isError: boolean = validateFields(newModel, [...requeridFields]);
        
        if (isError) return;

		if (direction.trim().length === 0) return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: 'La dirección es requerida' });

		const listProducts = Object.values(products).map(v => ({
			codigo_articulo: v.code,
      		cantidad: v.count
		}));

		const body = {
			codigo_cliente: client.codigo,
			condicion: client.tipopagofactor.toString(),
			direccion_cliente: direction,
			fecha_entrega: newModel.fecha_entrega,
			observacion: newModel.observation,
			horario_atencion: newModel.horario_atencion,
			lista_producto: listProducts,
			latitud: location[0],
			longitud: location[1],
			tipo_pago: "01",
			tipo_usuario: user.rol.nombre,
			id_borrador: '',
		}

		setViews(Views.summary);
		dispatch({ type: 'BODY', payload: body });
    }

	return <VoucherPage
		setViews={setViews}
		handleSubmit={handleSubmit}
		onSubmit={onSubmit}
		handleSelect={handleSelect}
		handleChange={handleChange}
		handleChangeTextarea={handleChangeTextarea}
		form={form}
		setForm={setForm}
		errors={errors}
		horarios={horarios}
	/>
}

export default Voucher;