import { BiEditAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import Badge from '../layauts/Badge';
import { DataBody } from '../layauts/table/Table';
import { ContainerIconAction } from './styled';
import { DataUserTable } from '../helpers/interface';
import { Dispatch } from "./types";

export const thead = ['DNI', 'Apellido', 'Nombre', 'Cargo', 'E-EMAIL', 'Estado', 'Acciones'];

const DESACTIVATED = 0;

export const tbody = (dataUsers: DataUserTable[], setIsOpen: (v: boolean) => void, dispatch: Dispatch, deleteUser: (v: number, isDelete?: boolean) => Promise<void>): DataBody => {

    return dataUsers.map((v, index) => (
        [
            v.documentoidentidad, v.apellidos, v.nombres, v.cargo, v.correo,
            <Badge
                elements={[{
                    name: v.estado,
                    color: v.idestado === DESACTIVATED ? 'badge-danger' : 'badge-success',
                    id: index
                }]}
                isSelect={false}
                setBadgeData={()=>[]}
                key={1}
            />,
            <div key={2} className='d-flex justify-content-center'>
                <ContainerIconAction
                    className={`mr-3 ${v.idestado === DESACTIVATED ? '' : 'pointer'}`}
                    color={v.idestado === DESACTIVATED ? 'white' : '#DFECFF'}
                    onClick={() => {

                        if (v.idestado === DESACTIVATED) return;
                        
                        setIsOpen(true);
                        dispatch({ type: 'IS_EDIT', payload: true });
                        dispatch({ type: 'DATA_USER_EDIT', payload: v });
                    }}
                >
                    {  v.idestado === DESACTIVATED ? null : <BiEditAlt size={20} /> }
                </ContainerIconAction>
    
                <ContainerIconAction
                    className={`${v.idestado === DESACTIVATED ? '' : 'pointer'}`}
                    color={v.idestado === DESACTIVATED ? 'white' : '#FFDFDF'}
                    onClick={() => {

                        if (v.idestado === DESACTIVATED) return;
                        void deleteUser(v.idusuario);
                    }}
                >
                    {  v.idestado === DESACTIVATED ? null : <IoCloseOutline size={20} /> }
                </ContainerIconAction>
            </div>
        ]
    ));
}

export enum IdsPasswordParameters {
    MININUM_LENGTH = 1,
    MINIMAL_CAPITALIZATION = 2,
    MINIMAL_LOWER = 3,
    MINIMAL_SYMBOL = 4,
    DAYS_WITHOUT_UPDATING_PASSWORD_VALUE = 5,
    MINIMAL_NUMBER = 6,
    LAST_PASSWORDS = 8,
    DAYS_WITHOUT_UPDATING_PASSWORD = 9,
    MAXIMUM_LOGIN_TRY = 10,
}

export const dictPasswordParameters: Record<string, string> = {
    1: 'minimumLength',
    2: 'minimalCapitalization',
    3: 'minimalLower',
    4: 'minimalSymbol',
    6: 'minimalNumber',
    8: 'lastPasswords',
    9: 'daysWithoutUpdatingPassword',
    10: 'maximumLoginTry',
};

export const idsPasswordParameters: Record<string, number> = {
    minimumLength: IdsPasswordParameters.MININUM_LENGTH,
    minimalCapitalization: IdsPasswordParameters.MINIMAL_CAPITALIZATION,
    minimalLower: IdsPasswordParameters.MINIMAL_LOWER,
    minimalSymbol: IdsPasswordParameters.MINIMAL_SYMBOL,
    milliseconds: IdsPasswordParameters.DAYS_WITHOUT_UPDATING_PASSWORD_VALUE,
    minimalNumber: IdsPasswordParameters.MINIMAL_NUMBER,
    lastPasswords: IdsPasswordParameters.LAST_PASSWORDS,
    daysWithoutUpdatingPassword: IdsPasswordParameters.DAYS_WITHOUT_UPDATING_PASSWORD,
    maximumLoginTry: IdsPasswordParameters.MAXIMUM_LOGIN_TRY,
};

export const daysWithoutUpdatingPassword = (n: number): string => {

    const currentDateMilliseconds = new Date().getTime();
    const milliseconds = 24 * 60 * 60 * 1000 * n;
    const daysWithoutUpdatingPassword = JSON.stringify(currentDateMilliseconds + milliseconds);

    return daysWithoutUpdatingPassword;
}