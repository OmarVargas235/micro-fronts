// 1.- librerias
import { useContext } from 'react';

// 2.- componentes
import Select, { IOption } from '../../layauts/select/Select';
import TextField from '../../layauts/textField/TextField';
import { Text } from '../../layauts/Text';
import Form from '../../layauts/form/Form';
import Button from '../../layauts/button/Button';

// 3.- context
import { AdminContext } from '../AdminProvider';

// 4.- interfaces
import { Model, RequeridFields, Password } from '../container/Form';
import { HandleSubmit, HandleChange } from '../../hooks/hookForm/interface';

// 5.- iconos
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props {
    documents: IOption[];
    cargos: IOption[];
    handleChange: HandleChange<Model>;
    onSubmit: (v: object) => Promise<void>;
    handleSubmit: HandleSubmit<Model>;
    handleSelect: (v: number, name: string) => void;
    form: Model;
    setForm: (value: Model) => void;
    errors: RequeridFields[];
    showPasswords: Password;
    setShowPasswords: (v: Password) => void;
}

const FormPage = ({ documents, cargos, handleChange, onSubmit, handleSubmit, handleSelect, form, setForm, errors, showPasswords, setShowPasswords }: Props): JSX.Element => {

    const { state:{ isEdit } } = useContext(AdminContext);

    return <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
    >
        <Text
            color='#006299'
            size='25px'
            weight='bold'
            className='mb-4'
        >{!isEdit ? 'Nuevo' : 'Editar'} Usuario</Text>
        
        <div className='row d-flex align-items-center'>
            <Select
                handleChange={(v: IOption) => handleSelect(Number(v.value), 'typeDocument')}
                options={documents}
                className='col-6'
                classNameSelect='w-100 input-radius'
                label='Tipo de Documento'
                value={form.typeDocument}
                isError={errors.includes('typeDocument')}
                isSearch={true}
                readonly={isEdit}
            />

            <TextField
                type='number'
                handleChange={e => handleChange(e, setForm, form)}
                name='number-document'
                value={form['number-document']}
                classes='col-6'
                classesContainerInput='input-radius'
                label='Número de documento'
                isError={errors.includes('number-document')}
                isReadOnly={isEdit}
            />

            <TextField
                handleChange={e => handleChange(e, setForm, form)}
                name='name'
                value={form.name}
                classes='col-6 mt-4'
                classesContainerInput='input-radius'
                label='Nombre'
                isError={errors.includes('name')}
                isReadOnly={isEdit}
            />

            <TextField
                handleChange={e => handleChange(e, setForm, form)}
                name='lastName'
                value={form.lastName}
                classes='col-6 mt-4'
                classesContainerInput='input-radius'
                label='Apellido'
                isError={errors.includes('lastName')}
                isReadOnly={isEdit}
            />

            <Select
                handleChange={(v: IOption) => handleSelect(Number(v.value), 'cargo')}
                options={cargos}
                className='col-12 mt-4'
                classNameSelect='w-100 input-radius w-100'
                label='Cargo'
                value={form.cargo}
                isError={errors.includes('cargo')}
            />

            <TextField
                handleChange={e => handleChange(e, setForm, form)}
                name='email'
                value={form.email}
                classes='col-12 mt-4'
                classesContainerInput='input-radius w-100'
                label='E-mail'
                isError={errors.includes('email')}
            />

            <TextField
                type={showPasswords.password ? 'text' : 'password'}
                handleChange={e => handleChange(e, setForm, form)}
                name='password'
                value={form.password}
                classes='col-6 mt-4'
                classesContainerInput='input-radius'
                label='Contraseña'
                isError={errors.includes('password')}
                icon={
                    showPasswords.password
                    ? <BsEye
                        size={25}
                        onClick={() => setShowPasswords({...showPasswords, password: false })} 
                        color='#090F47'
                    />
                    : <BsEyeSlash
                        size={25}
                        onClick={() => setShowPasswords({...showPasswords, password: true})}
                        color='#090F47'
                    />
                }
                edge='end'
            />

            <TextField
                type={showPasswords.repeatPassword ? 'text' : 'password'}
                handleChange={e => handleChange(e, setForm, form)}
                name='repeat-password'
                value={form['repeat-password']}
                classes='col-6 mt-4'
                classesContainerInput='input-radius'
                label='Confirmar Contraseña'
                isError={errors.includes('repeat-password')}
                icon={
                    showPasswords.repeatPassword
                    ? <BsEye
                        size={25}
                        onClick={() => setShowPasswords({...showPasswords, repeatPassword: false })} 
                        color='#090F47'
                    />
                    : <BsEyeSlash
                        size={25}
                        onClick={() => setShowPasswords({...showPasswords, repeatPassword: true})}
                        color='#090F47'
                    />
                }
                edge='end'
            />
        </div>

        <Button
            fullWidth={true}
            classes='mt-4'
            type='submit'
        >Guardar</Button>
    </Form>
}

export default FormPage;