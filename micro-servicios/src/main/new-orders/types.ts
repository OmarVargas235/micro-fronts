import { GetCustomer } from '../../service/interfaces';

export interface State {
    dataClient: GetCustomer;
}

type Payload = GetCustomer | number;

export interface Action {
    readonly type: 'DATA_CLIENT';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;