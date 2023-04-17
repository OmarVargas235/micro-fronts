import { User, Customer, Product } from '../helpers/interface';
import { ListOrders } from '../service/interfaces';

export interface State {
    user: User;
    location: number[];
    isAlert: boolean;
    isAlertSuccess: boolean;
    messageAlert: string;
    loading: boolean;
    products: Record<number, Product>;
    client: Customer;
    detailOrder: ListOrders;
}

type Payload = boolean | string | Record<number, Product> | Customer | ListOrders;

export interface Action {
    readonly type: 'IS_ALERT' | 'IS_ALERT_SUCCESS' | 'MESSAGE_ALERT' | 'IS_LOADING' | 'CART' | 'CLIENT' | 'DETAIL_ORDER';
    payload?: Payload;
}

export type Dispatch = (value: Action) => void;