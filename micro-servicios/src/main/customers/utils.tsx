import { AiOutlineUser } from "react-icons/ai";
import { OptionsBadge } from '../../layauts/Badge';

export enum IDbadges {
    code = 1,
    name = 2,
    businessName = 3
}

export const optionsBadges: OptionsBadge[] = [
    { name: 'Nombre', id: IDbadges.name, icon: <AiOutlineUser /> },
    { name: 'Razón Social', id: IDbadges.businessName },
    { name: 'Codigo', id: IDbadges.code },
];

export enum RowPerPage {
    value = 10
}