// 1.- librerias
import { useState, useEffect, useCallback } from "react";

type BadgeOutline = 'badge-secondary-outline' | 'badge-success-outline' | 'badge-primary-outline' | 'badge-success' | 'badge-danger';

export interface OptionsBadge {
    name: string;
    id: number;
    icon?: JSX.Element;
    color?: BadgeOutline;
}

interface Props {
    elements: OptionsBadge[];
    setBadgeData: (v: OptionsBadge) => void;
    isSelect?: boolean;
}

const Badge = ({ elements, setBadgeData, isSelect=true }: Props): JSX.Element => {

    const [copyBadges, setCopyBadges] = useState<OptionsBadge[]>([]);
    const [badges, setBadges] = useState<OptionsBadge[]>([]);

    const selectBadge = useCallback((badge: OptionsBadge) => {

        if (!isSelect) return;

        const newBadges = badges.map(v => {

			const copyBadge = {...v};

			copyBadge.color = v.id === badge.id
			? 'badge-success-outline' : 'badge-secondary-outline';

			return copyBadge;
		});

		setBadges(newBadges);
        setBadgeData(badge);

    }, [badges, isSelect]);

    useEffect(() => {

        setBadges(elements);
        setCopyBadges(elements);

    }, [elements]);

    useEffect(() => {

        if (copyBadges.length === 0) return;

        isSelect && selectBadge(copyBadges[0]);

    }, [copyBadges, isSelect]);

    return <>
        {
            badges.map((v, index) => (
                <div
                    key={index}
                    className={`badge ${v.color ?? 'badge-secondary-outline'} pointer ${index === 0 ? 'mr-1' : 'mx-1'}`}
                    onClick={() => selectBadge(v)}
                >
                    <span className={v.icon !== undefined ? 'mr-1' : ''}>{v.icon}</span>
                    <span>{v.name}</span>
                </div>
            ))
        }
    </>
}

export default Badge;