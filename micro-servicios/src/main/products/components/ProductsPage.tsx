// 1. librerias
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. components
import TextField from '../../../layauts/textField/TextField';
import Card from '../../../layauts/Card';
import Modal from '../../../layauts/modal/Modal';
import { Text } from '../../../layauts/Text';
import Badge, { OptionsBadge } from '../../../layauts/Badge';
import Paginate from '../../../layauts/paginate/Paginate';

// 3. interfaces
import { Product } from '../../../service/interfaces';

// 4. estilos
import { Container, Title, ContainerIcons } from '../styled';

// 5. Iconos
import { AiOutlineSearch, AiOutlineMedicineBox, AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

// 6.- utils
import { optionsBadges } from '../utils';

// 7.- theme
import { theme } from '../../../theme/theme';

interface Props {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    data: Product[];
    setBadgeData: (v: OptionsBadge) => void;
    search: (e: ChangeEvent<HTMLInputElement>) => void;
    valueSearch: string;
    total: number;
    rowsPerPage: (v: number) => void;
    page: (v: number) => void;
}

const ProductsPage = ({ isOpenModal, setIsOpenModal, data, setBadgeData, search, valueSearch, total, rowsPerPage, page }: Props): JSX.Element => {

    const history = useNavigate();

    return (
		<div className='d-flex justify-content-center my-4'>
            <Container className='container-sm px-0 py-4 d-flex flex-column align-items-center'>
                <div className='container-arrow-left w-100'>
                    <BsArrowLeftShort
                        className='mr-3 pointer'
                        size={35}
                        onClick={() => history('/home')}
                    />
                </div>

                <Title className='w-100'>Productos</Title>

                <TextField
                    placeholder='Buscar productos'
                    name='search'
                    handleChange={search}
                    isFull={true}
                    classes="mt-4 w-100"
                    classesContainerInput='border-radius'
                    icon={<AiOutlineSearch size={25} />}
                    edge="start"
                    value={valueSearch}
                />

                <div className='w-100 mt-5'>
					<Text>Buscar por:</Text>

					<Badge
						elements={optionsBadges}
						setBadgeData={setBadgeData}
					/>
				</div>

                <div className='row mt-5'>
                    {     
                        data.map((v, index) => (
							<Card
								key={index}
								title={v.nombre}
								texts={[`Cod: ${v.codigo}`, v.presentacion]}
								path={`/detalle-producto/${v.idProducto}`}
							/>
						))
					}
                    
                    {
                        data.length === 0 ? null : <Paginate
                            total={total}
                            rowsPerPage={rowsPerPage}
                            page={page}
                        />
                    }
                </div>

                <Modal
                    closeModal={value => setIsOpenModal(value)}
                    textBtn='Entendido'
                    classess="d-flex flex-column align-items-center"
                    open={isOpenModal}
                >
                    <ContainerIcons
                        className='position-relative d-flex justify-content-center align-items-center'
                    >
                        <AiOutlineMedicineBox size={40} color={theme.colors.color1} />
                        <AiFillCloseCircle
                            size={45}
                            color={theme.icons.error}
                            className='position-absolute closeCircle'
                        />
                    </ContainerIcons>

                    <Text
                        className='my-3'
                        color={theme.text.darkgray}
                        weight='600'
                    >Producto no encontrado</Text>

                    <Text
                        className='mb-4'
                        weight="600"
                        size='14px'
                    >Realice nuevamente la consulta</Text>
                </Modal>
            </Container>
        </div>
	);
}

export default ProductsPage;