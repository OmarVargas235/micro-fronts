export interface State {
    code: string;
}

type Payload = number | string;

export interface Action {
    readonly type: 'CODE_PRODUCT';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;