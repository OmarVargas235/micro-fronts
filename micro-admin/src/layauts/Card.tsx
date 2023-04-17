// 1.- librerias
import { useNavigate } from 'react-router-dom';

// 2.- components
import Button from './button/Button';
import { Text } from './Text';

// 3.- iconos
import { BsArrowRightShort } from "react-icons/bs";

import { theme } from '../theme/theme';

interface Props {
    img?: string | null;
    title: string;
    texts: string[];
    path: string;
    data?: object;
    handleClick?: () => void;
}

const Card = ({ img=null, title, texts, path, data, handleClick=()=>{} }: Props): JSX.Element => {

    const history = useNavigate();

    const detail = (): void => {

        history(path);
        handleClick();
    }

    return <div className='row px-0 col-12 col-sm-6 col-md-5 mr-3 mr-sm-0 mr-md-5 mb-5'>
        <div className='col-4 p-1 pr-0'>
            <div
                className='bg-secondary p-2 pr-0'
                style={{ width: '70px', height: '70px', borderRadius: '8px' }}
            >
                {
                    img !== null && <img
                        src={img}
                        alt="boticaria"
                        className='img-fluid'
                    />
                }
            </div>
        </div>

        <div className='col-8 p-1'>
            <Text
                size='14px'
                color={theme.primary}
                weight='bold'
            >{title}</Text>
            
            <div>
                {
                    texts.map((v, index) => (
                        <Text key={index} className='mb-2'>{v}</Text>
                    ))
                }
            </div>
        </div>

        <div className='w-100 mt-3 d-flex justify-content-end'>
            <Button
                type='submit'
                color='transparent'
                classessText="text-info h6"
                classes='btn'
                icon={<BsArrowRightShort size={30} color="#64AEFC" />}
                edge="end"
                handleClick={detail}
            >Ver detalle</Button>
        </div>
    </div>
}

export default Card;