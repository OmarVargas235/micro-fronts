// 1. librerias
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. components
import Button from '../button/Button';
import { Text } from '../Text';

// 3. interfaces

// 4. estilos
import { Container, ContainerImg } from './styled';

// 5. Iconos
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";

// 6.- theme
import { theme } from '../../theme/theme';

interface List {
    word: string;
    description: string | JSX.Element;
    color?: string;
}

interface Props {
    title: string;
    img?: string | null;
    subTitle: string;
    list: List[];
    pathArrowLeft: string;
    path: string;
}

const Detail = ({ title, img=null, subTitle, list, pathArrowLeft, path }: Props): JSX.Element => {

    const history = useNavigate();

	return (
		<Container className='w-100 py-5'>
            <div className='d-flex flex-column align-items-center container'>
                <div className='container-arrow-left w-100'>
                    <BsArrowLeftShort
                        className='mr-3 pointer'
                        size={35}
                        onClick={() => history(pathArrowLeft)}
                    />
                </div>

                <Text
                    color={theme.primary}
                    size='30px'
                    weight='bold'
                    className='text-center mb-5 w-75'
                >{title}</Text>

                <div className='border border-radius p-4 mb-4'>
                    <ContainerImg className='p-5 text-center'>
                        {
                            img !== null ? <img
                                src={img}
                                alt={subTitle}
                            /> : null
                        }
                    </ContainerImg>
                </div>

                <Text
                    color={theme.primary}
                    size='25px'
                    weight='600'
                    className='mb-4'
                >{subTitle}</Text>

                <div className='row'>
                    {
                        list.map((v, index) => (
                            <Fragment key={index}>
                                <Text className='col-6' color={v.color ?? theme.primary}>{v.word}:</Text>
                                <Text className='col-6' color={v.color ?? theme.colors.color1}>{v.description}</Text>
                            </Fragment>
                        ))
                    }
                </div>

                <Button
                    type='submit'
                    color='transparent'
                    classessText="text-info text-btn"
                    classes='btn mt-5'
                    icon={<BsArrowRightShort size={30} color="#64AEFC" />}
                    edge="end"
                    handleClick={() => history(path)}
                >Nuevo Pedido</Button>
            </div>
        </Container>
	);
}

export default Detail;