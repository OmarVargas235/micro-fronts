import { User } from '../helpers/interface';

export interface State {
    user: User;
    location: number[];
    isAlert: boolean;
    isAlertSuccess: boolean;
    messageAlert: string;
    loading: boolean;
}

type Payload = boolean | string;

export interface Action {
    readonly type: 'IS_ALERT' | 'IS_ALERT_SUCCESS' | 'MESSAGE_ALERT' | 'IS_LOADING' | 'CART' | 'CLIENT';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;