import { AiOutlineMedicineBox } from "react-icons/ai";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { GrDocumentConfig } from "react-icons/gr";
import { BsBoxSeam } from "react-icons/bs";
import { theme } from '../../theme/theme';

interface Options {
    icon: JSX.Element;
    name: string;
    path: string;
}

export const options: Options[] = [
    {
        icon: <AiOutlineMedicineBox size={40} color={theme.secondary} />,
        name: 'Productos',
        path: '/productos'
    },
    {
        icon: <HiOutlineBuildingStorefront size={40} color={theme.secondary} />,
        name: 'Clientes',
        path: '/clientes'
    },
    {
        icon: <GrDocumentConfig size={40} color={theme.secondary} />,
        name: 'Mis pedidos',
        path: '/mis-pedidos'
    },
    {
        icon: <BsBoxSeam size={40} color={theme.secondary} fill={theme.secondary} stroke={theme.secondary} />,
        name: 'Nuevo pedido',
        path: '/clientes'
    }
];