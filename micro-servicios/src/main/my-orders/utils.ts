import { OptionsBadge } from '../../layauts/Badge';

export enum IDbadges {
    nro_order = 1,
    name = 2,
    state = 3
}

export const optionsBadges: OptionsBadge[] = [
    { name: 'nº', id: IDbadges.nro_order },
    { name: 'Nombre', id: IDbadges.name },
    { name: 'Estado', id: IDbadges.state },
];

export enum RowPerPage {
    value = 10
}