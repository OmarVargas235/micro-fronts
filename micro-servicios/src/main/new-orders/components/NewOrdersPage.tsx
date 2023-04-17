// 1. librerias
import { ChangeEvent } from 'react';

// 2. components
import { Text } from '../../../layauts/Text';
import TextField from '../../../layauts/textField/TextField';
import Card from '../container/Card';
import Header from './HeaderPage';
import Footer from './Footer';
import Modal from '../../../layauts/modal/Modal';
import { ContainerIcons } from '../../products/styled';
import Paginate from '../../../layauts/paginate/Paginate';
import Badge, { OptionsBadge } from '../../../layauts/Badge';

// 3. interfaces
import { DataProduct } from '../container/NewOrders';

// 4. estilos
import { Container, ContainerCards } from '../styled';

// 5. iconos
import { AiFillCloseCircle, AiOutlineMedicineBox, AiOutlineSearch } from "react-icons/ai";

// 6.- utils
import { badges } from '../utils';

// 7.- utils
import { theme } from '../../../theme/theme';

interface Props {
	data: DataProduct[];
	isOpenModal: boolean;
	setIsOpenModal: (v: boolean) => void;
	total: number;
	rowsPerPage: (n: number) => void;
	page: (n: number) => void;
	search: (e: ChangeEvent<HTMLInputElement>) => void;
    valueSearch: string;
	setBadgeData: (v: OptionsBadge) => void;
	setData: (v: DataProduct[]) => void;
}

const NewOrdersPage = ({ data, isOpenModal, setIsOpenModal, total, rowsPerPage, page, search, valueSearch, setBadgeData, setData }: Props): JSX.Element => {

	return (
		<Container>
			<Header />

			<TextField
				classes='px-4 px-sm-5 position-relative input'
				classesContainerInput='bg-white'
				handleChange={search}
				name="search"
				value={valueSearch}
				isFull={true}
				icon={<AiOutlineSearch size={25} />}
				edge="start"
				placeholder='Buscar...'
			/>

			<div className='w-100 mt-5 px-3'>
				<Text>Buscar por:</Text>

				<Badge
					elements={badges}
					setBadgeData={setBadgeData}
				/>
			</div>

			<ContainerCards>
				<div className='row mt-5 px-3'>
					<Card
						data={data}
						setData={setData}
					/>

					<Paginate
                        total={total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                    />
				</div>

				<Footer />
			</ContainerCards>

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
	);
}

export default NewOrdersPage;