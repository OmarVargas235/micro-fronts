import { DataUserTable, SecurityParameters } from '../helpers/interface';

export interface IState {
    dataUsers: DataUserTable[];
    parametersPassword: SecurityParameters[];
	userEdit: DataUserTable;
	isEdit: boolean;
    updateDataTable: boolean;
    isUserManagement: boolean;
}

export type State = Readonly<IState>;

type Payload = DataUserTable[] | DataUserTable | boolean | SecurityParameters[];

export interface Action {
    readonly type: 'DATA_USERS_TABLE' | 'DATA_USER_EDIT' | 'IS_EDIT' | 'UPDATE_DATA_TABLE' | 'SECURITY_PARAMETERS' | 'IS_USER_MANAGEMENT';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;