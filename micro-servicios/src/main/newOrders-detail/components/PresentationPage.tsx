// 1.- Librerias

// 2.- components
import { Text } from '../../../layauts/Text';

// 3.- estilos
import { Box } from '../styled';

// 4.- interfaces
import { DeatilProduct } from '../../../service/interfaces';

// 5.- theme
import { theme } from '../../../theme/theme';

interface Props {
    data: DeatilProduct;
}

const PresentationPage = ({ data }: Props): JSX.Element => {

    return <>
        <Text
            color={theme.primary}
            weight='600'
            size='20px'
            className='my-4'
        >Presentacion</Text>

        <div className='d-flex'>
            {
                data.presentacion.length === 0
                ? <Text>No hay prensentaciones</Text>
                : data.presentacion.split('/').map((v, index) => (
                    <Box
                        key={index}
                        className='d-flex flex-column justify-content-center align-items-center mx-2 px-2 pointer'
                        isActive={index === 0}
                    >
                        <Text
                            weight='bold'
                            color={index === 0 ? theme.colors.color4 : theme.primary}
                            size='14px'
                        >{v}</Text>
                    </Box>
                ))
            }
        </div>
    </>
}

export default PresentationPage;