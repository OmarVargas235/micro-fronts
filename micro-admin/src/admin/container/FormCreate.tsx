// 1.- librerias
import { useState } from 'react';

// 2.- componentes
import Form, { Model, RequeridFields, requeridFields } from './Form';

// 3.- hooks
import { useForm } from '../../hooks/hookForm/useForm';

const FormCreate = (): JSX.Element => {

    const { handleSubmit, handleChange, setSelect, validateFields, errors } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        "number-document": '',
        "repeat-password": '',
        email: '',
        lastName: '',
        name: '',
        password: '',
        cargo: -1,
        typeDocument: -1,
    });

    const handleSelect = (v: number, name: string): void => {

        setSelect(name, v, setForm, form);
    }

    const onSubmit = async (model: object): Promise<void> => {

        const newModel = model as Model;
        const isError: boolean = validateFields(newModel, [...requeridFields]);
        
        if (isError) return undefined;
    }

    return <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleSelect={handleSelect}
        form={form}
        setForm={setForm}
        errors={errors}
    />
}

export default FormCreate;