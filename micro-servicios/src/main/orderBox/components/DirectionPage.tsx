// 1. librerias

// 2. components
import { Text } from '../../../layauts/Text';

// 3. estilos
import { Box } from '../styled';

// 4. iconos
import { IoIosRadioButtonOn, IoIosRadioButtonOff } from "react-icons/io";

// 5.- interfaces
import { Direction } from '../../../service/interfaces';

// 5.- theme
import { theme } from '../../../theme/theme';

interface Props {
    directions: Direction[];
    selectedDirection: (v: Direction, index: number) => void;
    indexSelected: number;
}

const ModalDirectionPage = ({ directions, selectedDirection, indexSelected }: Props): JSX.Element => {

    return <>
        <Text
            color={theme.primary}
            weight='600'
            size='20px'
        >Dirección de Entrega</Text>

        {
            directions.length > 0 ?
                directions.map((v, index) => (
                    <Box
                        key={index}
                        className='d-flex justify-content-between p-4 pointer mb-3'
                        onClick={() => selectedDirection(v, index)}
                        isSelected={index === indexSelected}
                    >
                        <div className='d-flex'>
                            {
                                index === indexSelected ? <IoIosRadioButtonOn
                                    color='#4157FF'
                                    size={25}
                                    className='mr-3'
                                /> : <IoIosRadioButtonOff
                                    color='#4157FF'
                                    size={25}
                                    className='mr-3'
                                />
                            }

                            <div>
                                <Text
                                    color={theme.primary}
                                    weight='600'
                                >{v.nombre}</Text>

                                <Text>{v.codigo}</Text>
                                <Text>{v.lugar_entrega}</Text>
                            </div>
                        </div>
                    </Box>
                ))
            : <Text>No hay direcciones</Text>
        }
    </>
}

export default ModalDirectionPage;