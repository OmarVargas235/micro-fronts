// 1.- librerias
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 2.- components
import { Text } from '../../../layauts/Text';
import TextField from '../../../layauts/textField/TextField';

// 3.- iconos
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

// 4.- styles
import { ContainerIcon, ContainerImg } from '../styled';

// 5.- utils
import { formatDecimals } from '../../../helpers/utils';

// 6.- theme
import { theme } from '../../../theme/theme';

// 7.- interfaces
import { DataProduct } from '../container/NewOrders';
import { Product } from '../../../service/interfaces';

interface Props {
    img?: string | null;
    path: string;
    data: DataProduct;
    width: number;
    handleClick: (data: DataProduct, n: boolean) => void;
    handleChange: (de: ChangeEvent<HTMLInputElement>, product: Product) => void;
}

let timeout: string | number | NodeJS.Timeout | undefined;

const Card = ({ data, img=null, path, width, handleClick, handleChange }: Props): JSX.Element => {

    const history = useNavigate();

    const detailProduct = (isPlus: boolean): void => {

        clearTimeout(timeout);

        handleClick(data, isPlus);
    }

    return <div className='row px-0 col-12 col-sm-6 col-md-5 mr-3 mr-sm-0 mb-5'>
        <div className={`col-${width < 300 ? '2' : '3'} col-sm-4 p-1 pr-0`}>
            <ContainerImg
                className='bg-secondary p-2 pr-0'
                onClick={() => history(path)}
            >
                {
                    img !== null && <img
                        src={img}
                        alt="boticaria"
                        className='img-fluid'
                    />
                }
            </ContainerImg>
        </div>

        <div className={`p-0 ${width < 300 ? 'col-7 pl-2' : 'col-6'}`}>
            <Text
                size={width < 300 ? '10px' :'13px'}
                color={theme.primary}
                weight='bold'
                className='pointer'
                onClick={() => history(path)}
            >{data.nombre}</Text>
            
            <div>
                {
                    [`Cod: ${data.codigo}`, data.presentacion, `subTotal producto: ${formatDecimals({ n: data.precioTotal })}`].map((v, index) => (
                        <Text
                            key={index}
                            size={width < 300 ? '13px' :'16px'}
                        >{v}</Text>
                    ))
                }
            </div>
        </div>

        <div className='col-2 p-sm-0 d-flex flex-column justify-content-center align-items-center pointer'>
            <ContainerIcon
                className='pointer d-flex justify-content-center align-items-center'
                onClick={() => detailProduct(false)}
            >
                <AiOutlineMinus color={theme.colors.color4} size={25} />
            </ContainerIcon>
            
            <TextField
                type='number'
                handleChange={(e) => handleChange(e, data)}
                name="amount"
                value={data.cantidad === -1 ? '' : data.cantidad}
                classes="my-2"
                classesContainerInput="input-product"
            />

            <ContainerIcon
                className='d-flex justify-content-center align-items-center'
                onClick={() => detailProduct(true)}
            >
                <BsPlus color={theme.colors.color4} size={25} />
            </ContainerIcon>
        </div>
    </div>
}

export default Card;