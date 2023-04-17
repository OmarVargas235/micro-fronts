// 1.- librerias
import { useState, useEffect, useContext } from 'react';

// 2.- componentes
import Form, { Model, RequeridFields, requeridFields } from './Form';

// 3.- hooks
import { useForm } from '../../hooks/hookForm/useForm';

// 4.- context
import { AdminContext } from '../AdminProvider';
import { GlobalContext } from '../../context/GlobalProvider';

// 5.- services
import { users } from '../../services/admin';

// 6.- utils
import { alert, validatePassword } from '../../helpers/utils';

interface Props {
    setIsOpen: (value: boolean) => void;
}

const FormEdit = ({ setIsOpen }: Props): JSX.Element => {

    const { handleSubmit, handleChange, setSelect, setModel, validateFields, errors } = useForm<Model, RequeridFields>();

    const { state:{ userEdit, updateDataTable, parametersPassword }, dispatch } = useContext(AdminContext);
    const { dispatch: dispatchGlobal } = useContext(GlobalContext);

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

    useEffect(() => {

        const data = {
            "number-document": userEdit.documentoidentidad,
            "repeat-password": '',
            email: userEdit.correo,
            lastName: userEdit.apellidos,
            name: userEdit.nombres,
            password: '',
            cargo: userEdit.idrol,
            typeDocument: userEdit.tipodocumento,
        };

        setForm(data);
        setModel(data);

    }, [userEdit]);

    const handleSelect = (v: number, name: string): void => {

        setSelect(name, v, setForm, form);
    }

    const onSubmit = async (model: object): Promise<void> => {

        const newModel = model as Model;

        const isError: boolean = validateFields(newModel, [...requeridFields]);
        const isPasswordSuccess = validatePassword(newModel.password, parametersPassword);
        const [, minCapitalization, minLower, minSymbols, , minNums] = parametersPassword;

        if (isError) return undefined;

        if (!isPasswordSuccess) {
            
            return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message: `La contraseña debe tener: ${minCapitalization.namerule} de ${minCapitalization.valor}, ${minLower.namerule} de ${minLower.valor}, ${minSymbols.namerule} de ${minSymbols.valor}, ${minNums.namerule} de ${minNums.valor}` });
        }

        if (newModel.password !== newModel['repeat-password']) {
            
            return alert({ dispatch: dispatchGlobal, isAlertSuccess: false, message:'Las contraseñas deben de ser iguales' });
        }

        const body = {
            id: userEdit.idusuario,
            email: newModel.email,
            idtipodocumento: userEdit.tipodocumento,
            idrol: newModel.cargo,
            documentoidentidad: userEdit.documentoidentidad,
            apellidos: newModel.lastName,
            nombres: newModel.name,
            password: newModel.password,
            idcargo: newModel.cargo,
            sameuser: true
            // sameuser: userEdit.idusuario === user.idUsuario
        }

        dispatchGlobal({ type: 'IS_LOADING', payload: true });

        const result = await users.editUser(body);

        dispatchGlobal({ type: 'IS_LOADING', payload: false });

        if (result.status === 200) {

            dispatch({ type: 'UPDATE_DATA_TABLE', payload: !updateDataTable });
            setIsOpen(false);
        }

        alert({ dispatch: dispatchGlobal, isAlertSuccess: result.status === 200, message: result.status === 200 ? 'Usuario editado con exito' : result.message });
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

export default FormEdit;