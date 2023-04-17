// 1. librerias
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. components
import Badge from '../../../layauts/Badge';
import { Text } from '../../../layauts/Text';

// 3. interfaces

// 4. estilos
import {Header, ContainerIconBox } from '../styled';

// 5. Iconos
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BsBoxSeam, BsArrowLeftShort } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

// 6.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 7.- theme
import { theme } from '../../../theme/theme';

const HeaderPage = (): JSX.Element => {

	const { state:{ client } } = useContext(GlobalContext);

	const history = useNavigate();

	return (
        <Header className='py-5 px-3 px-sm-5'>
            <div className='container-arrow-left w-100'>
                <BsArrowLeftShort
                    className='mr-3 pointer'
                    size={35}
                    onClick={() => history('/clientes')}
                />
            </div>

            <div className='row mb-4'>
                <div className='d-flex col-10'>
                    <HiOutlineBuildingStorefront
                        size={30}
                    />

                    <Text
                        size='25px'
                        weight='bold'
                        color={theme.white}
                        className='ml-1'
                        style={{ lineHeight: '30px' }}
                    >{client.nombrecomercial}</Text>
                </div>

                <div className='col-2 px-0'>
                    <ContainerIconBox className='position-relative'>
                        <BsBoxSeam size={30} className='position-absolute' />
                    </ContainerIconBox>
                </div>
            </div>

            <Badge
                elements={[
                    { name: client.estado, color: 'badge-success-outline', id: 1 },
                    { name: `Credito: ${client.lineacredito}`, color: 'badge-success-outline', id: 2 },
                    { name: `Código: ${client.codigo}`, color: 'badge-primary-outline', id: 3 },
                    { name: `RUC: ${client.ruc}`, color: 'badge-primary-outline', id: 4 },
                ]}
                isSelect={false}
                setBadgeData={()=>{}}
            />

            <div className='mt-4'>
                <div className='d-flex mb-4'>
                    <FaMapMarkerAlt />
                    
                    <div className='ml-2'>
                        <Text
                            color={theme.white}
                            size='14px'
                        >Dirección</Text>

                        <Text color={theme.white}>{client.direccion}</Text>
                    </div>
                </div>

                <div className='d-flex'>
                    <AiOutlineUser />
                    
                    <div className='ml-2'>
                        <Text color={theme.white} size='14px'>Razón Social</Text>
                        <Text
                            color={theme.white}
                            weight='bold'
                        >{client.razonsocial}</Text>
                    </div>
                </div>
            </div>
        </Header>
	);
}

export default HeaderPage;