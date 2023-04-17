import { OptionsBadge } from '../../layauts/Badge';

export enum IDbadges {
    code = 1,
    name = 2
}

export const badges: OptionsBadge[] = [
    { name: 'Nombre', id: IDbadges.name },
    { name: 'Código', id: IDbadges.code },
];