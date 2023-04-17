import { User, SecurityParameters } from '../helpers/interface';

export interface State {
    user: User;
    location: number[];
    isAlert: boolean;
    isAlertSuccess: boolean;
    messageAlert: string;
    loading: boolean;
    countPassword: number;
    parametersPassword: SecurityParameters[];
}

type Payload = boolean | string | number | SecurityParameters[];

export interface Action {
    readonly type: 'IS_ALERT' | 'IS_ALERT_SUCCESS' | 'MESSAGE_ALERT' | 'IS_LOADING' | 'COUNT_PASSWORD' | 'SECURITY_PARAMETERS';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;