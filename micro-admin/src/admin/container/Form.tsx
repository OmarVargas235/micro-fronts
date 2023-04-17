// 1.- librerias
import { useState, useEffect, useContext } from 'react';

// 2.- componentes
import FormPage from '../components/FormPage';

// 3.- interfaces
import { IOption } from '../../layauts/select/Select';
import { HandleSubmit, HandleChange } from '../../hooks/hookForm/interface';

// 4.- services
import { users } from '../../services/admin';

// 4.- context
import { GlobalContext } from '../../context/GlobalProvider';

interface IModel {
    'number-document': string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    'repeat-password': string;
    cargo: number;
    typeDocument: number,
}

export type Model = Readonly<IModel>;

export const requeridFields = ['number-document', 'name', 'lastName', 'email', 'password', 'repeat-password', 'cargo', 'typeDocument'] as const;

export type RequeridFields = typeof requeridFields[number];

export interface Password {
    password: boolean;
    repeatPassword: boolean;
}

interface Props {
    handleChange: HandleChange<Model>;
    handleSubmit:  HandleSubmit<Model>;
    onSubmit: (v: object) => Promise<void>;
    handleSelect: (v: number, name: string) => void;
    form: Model;
    setForm: (value: Model) => void;
    errors: RequeridFields[];
}

const Form = ({ handleChange, handleSubmit, onSubmit, handleSelect, form, setForm, errors }: Props): JSX.Element => {

    const { dispatch } = useContext(GlobalContext);

    const [documents, setDocuments] = useState<IOption[]>([{
        label: '',
        value: -1
    }]);
    const [cargos, setCargos] = useState<IOption[]>([{
        label: '',
        value: -1
    }]);
    const [showPasswords, setShowPasswords] = useState<Password>({
        password: false,
        repeatPassword: false,
    });

    // Obtener documentos
    useEffect(() => {

        dispatch({ type: 'IS_LOADING', payload: true });

        users.getDocuments()
            .then(resp => {

                if (resp.data === null) return;

                setDocuments(resp.data.map(v => ({
                    value: v.id,
                    label: v.nombre,
                })));
            })
            .catch(err => {

                console.log(err);
            })
            .finally(() => {

                dispatch({ type: 'IS_LOADING', payload: false });
            });

    }, []);

    // Obtener cargos
    useEffect(() => {

        dispatch({ type: 'IS_LOADING', payload: true });

        users.getCargos()
            .then(resp => {

                if (resp.data === null) return;

                setCargos(resp.data.map(v => ({
                    value: v.id,
                    label: v.nombre,
                })));
            })
            .catch(err => {

                console.log(err);
            })
            .finally(() => {

                dispatch({ type: 'IS_LOADING', payload: false });
            });

    }, []);

    return <FormPage
        documents={documents}
        cargos={cargos}
        handleChange={handleChange}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        handleSelect={handleSelect}
        form={form}
        setForm={setForm}
        errors={errors}
        showPasswords={showPasswords}
        setShowPasswords={setShowPasswords}
    />
}

export default Form;