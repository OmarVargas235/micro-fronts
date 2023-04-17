// 1. librerias
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. components
import { Text } from '../../../layauts/Text';
import TextField from '../../../layauts/textField/TextField';
import CardPage from './CardPage';
import Paginate from '../../../layauts/paginate/Paginate';
import Badge, { OptionsBadge } from '../../../layauts/Badge';

// 3. interfaces
import { ListOrder } from '../container/MyOrders';

// 4. estilos
import { Container } from '../styled';

// 5.- iconos
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineSearch } from 'react-icons/ai';

// 6.- utils
import { optionsBadges } from '../utils';

// 7.- theme
import { theme } from '../../../theme/theme';

interface Props {
	data: ListOrder[];
	total: number;
	search: (e: ChangeEvent<HTMLInputElement>) => void;
	valueSearch: string;
	rowsPerPage: (v: number) => void;
    page: (v: number) => void;
	setBadgeData: (v: OptionsBadge) => void;
}

const MyOrdersPage = ({ data, total, search, valueSearch, rowsPerPage, page, setBadgeData }: Props): JSX.Element => {

	const history = useNavigate();

	return (
		<Container className='d-flex justify-content-center'>
			<div className='section'>
				<div className='container-arrow-left w-100'>
					<BsArrowLeftShort
						className='mr-3 pointer'
						size={35}
						onClick={() => history('/home')}
					/>
				</div>

				<Text
					size='32px'
					color={theme.primary}
					weight='bold'
				>Mis pedidos</Text>

				<TextField
					placeholder='Buscar pedido'
					name='search'
					handleChange={search}
					isFull={true}
					classes="mt-4 w-100"
					classesContainerInput='border-radius'
					icon={<AiOutlineSearch size={25} />}
					edge="start"
					value={valueSearch}
				/>

				<div className='w-100 my-3'>
					<Text>Buscar por:</Text>

					<Badge
						elements={optionsBadges}
						setBadgeData={setBadgeData}
					/>
				</div>
				
				{
					data.map((v, index) => (
						<CardPage
							key={index}
							data={v}
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
		</Container>
	);
}

export default MyOrdersPage;