// 1.- librerias
import { useState, useEffect, useContext } from 'react';

// 2.- componentes
import PasswordParametersPage from '../components/PasswordParametersPage';

// 3.- hooks
import { useForm } from '../../hooks/hookForm/useForm';

// 4.- services
import { passwordParameters } from '../../services/passwordParameters';

// 5.- context
import { GlobalContext } from '../../context/GlobalProvider';
import { AdminContext } from '../AdminProvider';

// 6.- interfaces 

// 7.- utils
import { daysWithoutUpdatingPassword, dictPasswordParameters, IdsPasswordParameters, idsPasswordParameters } from '../utils';
import { alert } from '../../helpers/utils';

interface IModel {
    minimumLength: number;
    minimalCapitalization: number;
    minimalLower: number;
    minimalSymbol: number;
    minimalNumber: number;
    lastPasswords: number;
    daysWithoutUpdatingPassword: number;
    maximumLoginTry: number;
}

export type Model = Readonly<IModel>;

export const requeridFields = ['minimumLength', 'minimalCapitalization', 'minimalLower', 'minimalSymbol', 'minimalNumber', 'lastPasswords', 'daysWithoutUpdatingPassword', 'maximumLoginTry'] as const;

export type RequeridFields = typeof requeridFields[number];

const PasswordParameters = (): JSX.Element => {

    const { state:{ parametersPassword } } = useContext(AdminContext);
    const { dispatch } = useContext(GlobalContext);

    const { handleSubmit, handleChange, validateFields, errors, setSelect, setValuesDefault } = useForm<Model, RequeridFields>();

	const [form, setForm] = useState<Model>({
        minimumLength: 0,
        minimalCapitalization: 0,
        minimalLower: 0,
        minimalSymbol: 0,
        minimalNumber: 0,
        lastPasswords: 0,
        daysWithoutUpdatingPassword: 0,
        maximumLoginTry: 0,
    });

    useEffect(() => setValuesDefault('lastPasswords', 0), [setValuesDefault]);

    // Setear parametros de contraseña
    useEffect(() => {

        parametersPassword.filter(v => v.id !== 5).forEach((v, index) => {

            const name = dictPasswordParameters[v.id];

            const nameRuler = requeridFields[index];
            const isDivision = (v.id === IdsPasswordParameters.MINIMAL_CAPITALIZATION || v.id === IdsPasswordParameters.MINIMAL_LOWER || v.id === IdsPasswordParameters.MINIMAL_SYMBOL || v.id === IdsPasswordParameters.MINIMAL_NUMBER);

            setValuesDefault(nameRuler, v.valor);
            
            if (isDivision && nameRuler !== undefined) {
                
                setValuesDefault(nameRuler, v.valor);
            }

            v.id === IdsPasswordParameters.LAST_PASSWORDS
            && setValuesDefault('lastPasswords', v.valor === 'Si' ? 1 : 0);

            if (name === undefined) return;

            setForm(state => ({
                ...state,
                [name]: v.id === IdsPasswordParameters.LAST_PASSWORDS
                    ? (v.valor === 'Si' ? 1 : 0)
                    : v.valor
            }));
        });

    }, [parametersPassword, setValuesDefault]);

    const handleSelect = (value: number, name: string): void => {

        setSelect(name, value, setForm, form);

        if (name === 'minimumLength') {

            setValuesDefault('minimalCapitalization', value === 8 ? 2 : 1);
            setValuesDefault('minimalLower', value === 8 ? 2 : 1);
            setValuesDefault('minimalSymbol', value === 8 ? 2 : 1);
            setValuesDefault('minimalNumber', value === 8 ? 2 : 1);

            setForm(state => ({
                ...state,
                minimalCapitalization: value === 8 ? 2 : 1,
                minimalLower: value === 8 ? 2 : 1,
                minimalSymbol: value === 8 ? 2 : 1,
                minimalNumber: value === 8 ? 2 : 1,
            }));

        }
    }

    const onSubmit = async (model: object): Promise<void> => {

        const newModel = model as Model;
        const isError: boolean = validateFields(newModel, [...requeridFields]);
        
        if (isError) return;

        const reglas: Array<{ id: number; value: string; }> = [];
        const obj = model as Record<string, string>;
        obj.milliseconds =  daysWithoutUpdatingPassword(newModel.daysWithoutUpdatingPassword);

        for (const x in obj) {

            const id = idsPasswordParameters[x];
            const value = id === IdsPasswordParameters.LAST_PASSWORDS ?
                (newModel.lastPasswords === 1 ? 'Si' : 'No')
                : obj[x].toString();

            reglas.push({ id, value });
        }

        dispatch({ type: 'IS_LOADING', payload: true });

        passwordParameters.changeParameters(reglas)
            .then(resp => {

                if (resp.status !== 200 || resp.data === null) {

                    return alert({ dispatch, isAlertSuccess: false, message: resp.message });
                }

                alert({ dispatch, isAlertSuccess: true, message: 'Parametros de contraseña actualizado con exito' });
            })
            .catch(err => console.log(err))
            .finally(() => dispatch({ type: 'IS_LOADING', payload: false }));
    }

    return <PasswordParametersPage
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        handleChange={handleChange}
        form={form}
        setForm={setForm}
        handleSelect={handleSelect}
        errors={errors}
    />
}

export default PasswordParameters;