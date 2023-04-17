import { Direction, Schedule } from '../../service/interfaces';
import { BodyRegister } from '../../service/orders';

export interface Summary {
    igv: number;
    discountClient: number;
    discountProduct: number;
    deadline: string;
    officeHours: string;
    observation: string;
}

export interface State {
    total: number;
    countProduct: number;
    direction: string;
    directions: Direction[];
    schedule: Schedule[];
    body: BodyRegister;
    summary: Summary;
    isResumeOrder: boolean;
}

type Payload = number | string | boolean | Schedule[] | Direction[] | BodyRegister | Summary;

export interface Action {
    readonly type: 'TOTAL' | 'COUNT_PRODUCT' | 'DIRECTION' | 'SCHEDULE' | 'DIRECTIONS' | 'BODY' | 'SUMMARY' | 'IS_RESUMEN';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;