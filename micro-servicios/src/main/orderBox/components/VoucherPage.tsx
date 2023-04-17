// 1. librerias
import { useContext } from 'react';

// 2. components
import Button from '../../../layauts/button/Button';
import { Text } from '../../../layauts/Text';
import TextField from '../../../layauts/textField/TextField';
import Select, { IOption } from '../../../layauts/select/Select';
import Form from '../../../layauts/form/Form';
import Header from './Header';
import ModalDirection from '../container/Direction';

// 3. interfaces
import { HandleChange, HandleChangeTextarea, HandleSubmit } from '../../../hooks/hookForm/interface';
import { Model, RequeridFields } from '../container/Voucher';

// 4. estilos
import { Container } from '../styled';

// 5.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 4.- utils
import { Views } from '../utils';

// 5.- theme
import { theme } from '../../../theme/theme';

interface Props {
    setViews: (value: number) => void;
    handleSubmit: HandleSubmit<Model>;
    onSubmit: (model: object) => Promise<void>;
    handleSelect: (value: number | string, name: string) => void;
    handleChange: HandleChange<Model>;
    handleChangeTextarea: HandleChangeTextarea<Model>;
    form: Model;
    setForm: (v: Model) => void;
    errors: RequeridFields[];
    horarios: IOption[];
}

const maxLengthObservation: number = 150;

const VoucherPage = ({ setViews, handleSubmit, onSubmit, handleSelect, handleChange, handleChangeTextarea, form, setForm, errors, horarios }: Props): JSX.Element => {

    const { state:{ client } } = useContext(GlobalContext);

	return (
		<Container className='py-5' isVoucher={true}>
            <div className='container px-2'>
                <Header
                    setViews={setViews}
                    title="Comprobante"
                    idView={Views.orderBox}
                />

                <ModalDirection />

                <Form
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                >
                    <Text
                        color={theme.primary}
                        weight='600'
                        size='20px'
                        className='mt-4 mb-2'
                    >Observación</Text>

                    <TextField
                        type="textarea"
                        value={form.observation}
                        name="observation"
                        classesContainerInput='w-100'
                        handleChange={()=>{}}
                        handleChangeTextarea={e => handleChangeTextarea(e, setForm, form)}
                        maxLength={maxLengthObservation}
                        isError={form.observation.length === maxLengthObservation}
                        helperText={form.observation.length === maxLengthObservation ? `Solo se permite un maximo de ${maxLengthObservation} caracteres` : ""}
                        colorHelperText="#D32F2F"
                    />

                    <Text
                        color={theme.primary}
                        weight='600'
                        size='20px'
                        className='mt-4 mb-2'
                    >Condición de venta</Text>

                    <TextField
                        type="text"
                        value={client.tipopago}
                        name="condicion"
                        classesContainerInput='w-100'
                        handleChange={e => handleChange(e, setForm, form)}
                        isReadOnly={true}
                    />

                    <Text
                        color={theme.primary}
                        weight='600'
                        size='20px'
                        className='mt-4 mb-2'
                    >Fecha de entrega</Text>

                    <TextField
                        type="date"
                        name="fecha_entrega"
                        value={form.fecha_entrega}
                        classesContainerInput='w-100'
                        handleChange={e => handleChange(e, setForm, form)}
                        isError={errors.includes('fecha_entrega')}
                    />

                    <Text
                        color={theme.primary}
                        weight='600'
                        size='20px'
                        className='mt-4 mb-2'
                    >Horario de atención</Text>

                    <Select
                        options={horarios}
                        handleChange={(e: IOption) => handleSelect(e.value, 'horario_atencion')}
                        isError={errors.includes('horario_atencion')}
                    />

                    <Button type='submit' classes='mt-4' fullWidth={true}>Ver resumen</Button>
                </Form>
            </div>
        </Container>
	);
}

export default VoucherPage;