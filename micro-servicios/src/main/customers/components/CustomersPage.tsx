// 1. librerias
import { ChangeEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. components
import TextField from '../../../layauts/textField/TextField';
import { Text } from '../../../layauts/Text';
import Modal from '../../../layauts/modal/Modal';
import Badge, { OptionsBadge } from '../../../layauts/Badge';
import Card from '../../../layauts/Card';
import Paginate from '../../../layauts/paginate/Paginate';

// 3. interfaces
import { Customer } from '../../../helpers/interface';

// 4. estilos
import { Container, Title, ContainerIcons } from '../styled';

// 5.- iconos
import { AiOutlineSearch, AiOutlineMedicineBox, AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

// 6.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 7.- utils
import { optionsBadges } from '../utils';

// 8.- utils
import { theme } from '../../../theme/theme';

interface Props {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
	data: Customer[];
	valueSearch: string;
	search: (e: ChangeEvent<HTMLInputElement>) => void;
	setBadgeData: (v: OptionsBadge) => void;
	total: number;
	rowsPerPage: (v: number) => void;
    page: (v: number) => void;
}

const CustomersPage = ({ isOpenModal, setIsOpenModal, data, valueSearch, search, setBadgeData, total, rowsPerPage, page }: Props): JSX.Element => {

	const { dispatch:dispatchGlobal } = useContext(GlobalContext);

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

				<Title className='w-100'>Clientes</Title>

				<TextField
					placeholder='Buscar cliente'
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

				<div className='row mt-5 w-100'>
					{
						data.map((v, index) => (
							<Card
								key={index}
								title={v.nombrecomercial}
								texts={[`Cod: ${v.codigo}`, v.razonsocial, v.direccion]}
								path='/detalle-cliente'
								data={v}
								handleClick={() => dispatchGlobal({ type: 'CLIENT', payload: v })}
							/>
						))
					}

					<Paginate
						total={total}
						rowsPerPage={rowsPerPage}
						page={page}
					/>
				</div>

				<Modal
					closeModal={value => setIsOpenModal(value)}
					textBtn='Entendido'
					classess="d-flex flex-column align-items-center"
					open={isOpenModal}
					width='340px'
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
						className='my-3 text-center'
						color={theme.text.darkgray}
						weight='600'
						size='30px'
					>Cliente no encontrado</Text>

					<Text
						className='mb-4'
						weight="600"
					>Realice nuevamente la consulta</Text>
				</Modal>
			</Container>
		</div>
	);
}

export default CustomersPage;