// 1.- librerias

// 2.- componentes
import { Text } from '../../../layauts/Text';
// import Button from '../../../layauts/button/Button';

// 3.- estilos
import { Container, Img } from '../styled';

// 4.- imagenes
import img from '../../../assets/offline.png';

interface Props {
    isOnline: boolean;
}

const OfflinePage = ({ isOnline }: Props): JSX.Element => {

    return <Container
        className={`d-${isOnline ? 'none' : 'flex'} justify-content-center align-items-center`}
    >
        <div>
            <Img src={img} alt="offline" />

            <Text
                className='my-3'
            >No network connection</Text>

            {/* <Button classes='btn-otline'>Try again</Button> */}
        </div>
    </Container>
}

export default OfflinePage;