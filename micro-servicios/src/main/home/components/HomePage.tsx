// 1. librerias
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. context
import { GlobalContext } from '../../../context/GlobalProvider';

// 3. estilos
import { Container, CotainerBody, Title, Header, Body, ContainerCards } from '../styled';

// 4. utils
import { options } from '../utils';

// 5. imagenes
import BgHome from '../../../assets/bg-home.png';

// 6.- layauts
import { Text } from '../../../layauts/Text';

const HomePage = (): JSX.Element => {

    const { state:{ user } } = useContext(GlobalContext);

    const history = useNavigate();

	return (
		<Container className='d-flex justify-content-center'>
            <CotainerBody className='d-flex flex-column align-items-center justify-content-center'>
                <Header className='w-100 text-center'>
                    <img src={BgHome} alt='bg-home' className='img-fluid' />
                </Header>
                
                <Body className='w-100 position-relative container px-4 px-sm-0 pt-4'>               
                    <div className='row d-flex justify-content-center'>
                        <div className='col-12 col-sm-11 p-4'>
                            <Title>¡Hola {user.nombres} {user.apellidos}!</Title>

                            <Text>Bienvenido a RoxFarma</Text>
                        </div>
                    </div>

                    <ContainerCards className='row d-flex justify-content-center'>
                        {
                            options.map((v, index) => (
                                <div
                                    className="card col-sm-5 py-3 m-1 d-flex justify-content-center align-items-center pointer"
                                    key={index}
                                    onClick={() => history(v.path)}
                                >
                                    <div className='container-icon d-flex justify-content-center align-items-center'>{ v.icon }</div>

                                    <p className='mt-4'>{v.name}</p>
                                </div>
                            ))
                        }
                    </ContainerCards>
                </Body>
            </CotainerBody>
        </Container>
	);
}

export default HomePage;