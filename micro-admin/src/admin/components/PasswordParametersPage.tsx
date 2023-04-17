// 1.- librerias

// 2.- componentes
import Form from '../../layauts/form/Form';
import Select, { IOption } from '../../layauts/select/Select';
import TextField from '../../layauts/textField/TextField';
import Button from '../../layauts/button/Button';

// 3.- interfaces
import { HandleSubmit, HandleChange } from '../../hooks/hookForm/interface';
import { Model } from '../container/PasswordParameters';

interface Props {
    handleSubmit: HandleSubmit<Model>;
    onSubmit: (v: object) => Promise<void>;
    handleChange: HandleChange<Model>;
    form: Model;
    setForm: (v: Model) => void;
    handleSelect: (v: number, name: string) => void;
    errors: string[];
}

const PasswordParametersPage = ({ handleSubmit, onSubmit, handleChange, form, setForm, handleSelect, errors }: Props): JSX.Element => {

    return <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        className='row align-items-center mt-5'
    >
        <Select
            options={[
                { label: '8', value: 8 },
                { label: '4', value: 4 },
            ]}
            className='col-4 px-0'
            label='Longitud mínima'
            handleChange={(v: IOption) => handleSelect(Number(v.value), 'minimumLength')}
            isError={errors.includes('minimumLength')}
            value={Number(form.minimumLength)}
        />

        <TextField
            type='number'
            handleChange={e => handleChange(e, setForm, form)}
            name='minimalCapitalization'
            value={form.minimalCapitalization}
            classes='col-4'
            classesContainerInput='w-100'
            label='Mayusculas mínimas'
            isError={errors.includes('minimalCapitalization')}
            isReadOnly={true}
        />

        <TextField
            type='number'
            handleChange={e => handleChange(e, setForm, form)}
            name='minimalLower'
            value={form.minimalLower}
            classes='col-4'
            classesContainerInput='w-100'
            label='Mínusculas mínimas'
            isError={errors.includes('minimalLower')}
            isReadOnly={true}
        />

        <TextField
            type='number'
            handleChange={e => handleChange(e, setForm, form)}
            name='minimalSymbol'
            value={form.minimalSymbol}
            classes='col-4 mt-4 px-0'
            classesContainerInput='w-100'
            label='Símbolos mínimos'
            isError={errors.includes('minimalSymbol')}
            isReadOnly={true}
        />

        <TextField
            type='number'
            handleChange={e => handleChange(e, setForm, form)}
            name='minimalNumber'
            value={form.minimalNumber}
            classes='col-4 mt-4'
            classesContainerInput='w-100'
            label='Números mínimos'
            isError={errors.includes('minimalNumber')}
            isReadOnly={true}
        />

        <Select
            options={[
                { label: 'No', value: 0 },
                { label: 'Si', value: 1 },
            ]}
            className='col-4 mt-4'
            label='Última contraseña'
            handleChange={(v: IOption) => handleSelect(Number(v.value), 'lastPasswords')}
            isError={errors.includes('lastPasswords')}
            value={Number(form.lastPasswords)}
        />

        <TextField
            type='number'
            handleChange={e => handleChange(e, setForm, form)}
            name='daysWithoutUpdatingPassword'
            value={form.daysWithoutUpdatingPassword}
            classes='col-4 mt-4 px-0'
            classesContainerInput='w-100'
            label='Días sin actualizar contraseña'
            isError={errors.includes('daysWithoutUpdatingPassword')}
        />

        <TextField
            type='number'
            handleChange={e => handleChange(e, setForm, form)}
            name='maximumLoginTry'
            value={form.maximumLoginTry}
            classes='col-4 mt-4'
            classesContainerInput='w-100'
            label='Máximo de intentos login'
            isError={errors.includes('maximumLoginTry')}
        />

        <div className='d-flex mt-4 col-12 px-0'>
            <Button classes='mr-3' type='submit'>Enviar</Button>
            <Button
                classes='btn-outline-info'
            >Cancelar</Button>
        </div>
    </Form>
}

export default PasswordParametersPage;