// 1. librerias
import { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 2. components
import { Text } from '../../../layauts/Text';
import TextField from '../../../layauts/textField/TextField';
// import Button from '../../../layauts/button/Button';
import DetailProductPage from './DetailProductPage';
import PresentationPage from './PresentationPage';

// 3. interfaces
import { DeatilProduct } from '../../../service/interfaces';

// 4. estilos
import { Container, ContainerIconBox, ContainerImg, ContainerIcon, Footer } from '../styled';

// 5. iconos
import { BsBoxSeam, BsPlus, BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

// 6.- utils
import { formatDecimals } from '../../../helpers/utils';

// 7.- utils
import { theme } from '../../../theme/theme';

interface Props {
    data: DeatilProduct;
    total: number;
    price: number;
    handleClick: (n: boolean) => void;
    handleChange: (n: ChangeEvent<HTMLInputElement>) => void;
}

const NewOrdersDetailPage = ({ data, total, price, handleClick, handleChange }: Props): JSX.Element => {

    const history = useNavigate();
    const code = useParams().id as unknown as number;

	return <div className='w-100 d-flex justify-content-center'>
        <Container className='py-5'>
            <div className='px-4 px-sm-5'>
                <div className='container-arrow-left w-100'>
                    <BsArrowLeftShort
                        className='mr-3 pointer'
                        size={35}
                        onClick={() => history(`/nuevos-pedidos/${code}`)}
                    />
                </div>

                <div className='d-flex justify-content-between row'>
                    <Text
                        color={theme.primary}
                        size='14px'
                        weight='bold'
                        className='text col-10 pl-0'
                    >{data.nombre}</Text>

                    <div className='col-2'>
                        <ContainerIconBox className='d-flex justify-content-center align-items-center'>
                            <BsBoxSeam size={25} color={theme.white} />
                        </ContainerIconBox>
                    </div>
                </div>

                <Text>{data.categoria}</Text>

                <ContainerImg className='p-5 text-center'>
                    {/* <img
                        src={img}
                        alt='crema'
                    /> */}
                </ContainerImg>

                <DetailProductPage data={data} />

                <PresentationPage data={data} />

                <Text
                    color={theme.primary}
                    weight='600'
                    size='20px'
                    className='my-4'
                >Cantidad</Text>

                <div className='d-flex'>
                    <TextField
                        type='number'
                        handleChange={handleChange}
                        name="amount"
                        value={total === -1 ? '' : total}
                    />

                    <div className='col-2 d-flex align-items-center'>
                        <ContainerIcon
                            className='mr-2 pointer'
                            onClick={() => handleClick(true)}
                        >
                            <BsPlus color={theme.colors.color4} size={25} />
                        </ContainerIcon>
                        
                        <ContainerIcon
                            className='pointer'
                            onClick={() => handleClick(false)}
                        >
                            <AiOutlineMinus color={theme.colors.color4} size={25} />
                        </ContainerIcon>
                    </div>
                </div>
            </div>

            <Footer className='p-4 w-100 d-flex justify-content-center'>
                <div className='d-flex justify-content-between align-items-center container-footer'>
                    <div>
                        <Text color={theme.primary} className='text1'>{total < 0 ? 0 : total} productos</Text>
                        <Text
                            color={theme.primary}
                            size='20px'
                            weight='550'
                            className='text2'
                        >{formatDecimals({ n: price })}</Text>
                    </div>
                </div>
            </Footer>
        </Container>
    </div>
}

export default NewOrdersDetailPage;