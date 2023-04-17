import { User } from '../../helpers/interface';

import { AiOutlineMail } from 'react-icons/ai';
import { RiUser2Line } from "react-icons/ri";
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineIdentification } from "react-icons/hi";

interface Option {
    icon: JSX.Element;
    text: string | number;
}

export const options = (user: User): Option[] => {

    return [
        {
            icon: <AiOutlineMail
                color='#090F47'
                size={30}
            />,
            text: user.correo
        },
        {
            icon: <RiUser2Line
                color='#090F47'
                size={30}
            />,
            text: user.cargo.nombre
        },
        {
            icon: <IoIosPhonePortrait
                color='#090F47'
                size={30}
            />,
            text: user.telefono
        },
        {
            icon: <HiOutlineIdentification
                color='#090F47'
                size={30}
            />,
            text: user.documentoidentidad
        },
    ];
}