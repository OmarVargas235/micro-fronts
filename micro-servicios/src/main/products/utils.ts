import { OptionsBadge } from '../../layauts/Badge';

export enum IDbadges {
    code = 1,
    name = 2,
    codeAbrev = 3
}

export const optionsBadges: OptionsBadge[] = [
    { name: 'Nombre', id: IDbadges.name },
    { name: 'Código Abrev', id: IDbadges.codeAbrev },
    { name: 'Código', id: IDbadges.code },
];

export enum RowPerPage {
    value = 10
}