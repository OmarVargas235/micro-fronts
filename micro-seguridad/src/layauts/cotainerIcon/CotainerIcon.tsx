import { ContainerIcons } from './styled';

import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { theme } from '../../theme/theme';

interface IProps {
    icon: JSX.Element;
    isCheck?: boolean;
}

const CotainerIcon = ({ icon, isCheck=false }: IProps): JSX.Element => (
    <div className='d-flex justify-content-center'>
        <ContainerIcons
                className='position-relative d-flex justify-content-center align-items-center mb-4'
        >
            { icon }

            {
                isCheck ? <AiFillCheckCircle
                    size={45}
                    color={theme.icons.check}
                    className='position-absolute closeCircle'
                /> : <AiFillCloseCircle
                    size={45}
                    color={theme.icons.error}
                    className='position-absolute closeCircle'
                />
            }
        </ContainerIcons>
    </div>
);

export default CotainerIcon;