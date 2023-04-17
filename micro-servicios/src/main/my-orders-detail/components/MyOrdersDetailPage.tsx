// 1. librerias
import { Fragment, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 2. components
import { Text } from '../../../layauts/Text';
import Button from '../../../layauts/button/Button';
// import Wizard from '../container/Wizard';

// 3. interfaces
import { DetailOrder } from '../../../service/interfaces';

// 4. estilos
import { Container } from '../styled';

// 5.- iconos
import { BsArrowLeftShort } from "react-icons/bs";

// 6.- hooks
import { useMediaQuery } from '../../../hooks/useMediaQuery';

// 7.- context
import { GlobalContext } from '../../../context/GlobalProvider';

// 8.- utils
import { formatDecimals, roundDecimals } from '../../../helpers/utils';

// 9.- theme
import { theme } from '../../../theme/theme';

interface Props {
	data: DetailOrder[];
	resendVerificationRequest: () => Promise<void>;
	stockTotal: number;
	total: number;
}

type State = 'AP' | 'PE' | 'RE' | 'BR' | 'AN';
type Badge = 'badge-success' | 'badge-warning' | 'badge-danger' | 'badge-secondary' | 'badge-dark';

const colorBadge: Record<State, Badge> = {
    'AP': 'badge-success',
    'PE': 'badge-warning',
    'RE': 'badge-danger',
    'BR': 'badge-secondary',
    'AN': 'badge-dark',
}

const MyOrdersPage = ({ data, resendVerificationRequest, stockTotal, total }: Props): JSX.Element => {

	const { state:{ detailOrder } } = useContext(GlobalContext);

	const { id } = useParams();
	const history = useNavigate();

	const matches = useMediaQuery('(max-width: 360px)');
	
	return (
		<Container className='d-flex justify-content-center pt-5 pb-4'>
			<div className='w-600 d-flex flex-column align-items-center'>
				<div className='d-flex align-items-center mb-4'>
					<BsArrowLeftShort
						size={45}
						color={theme.primary}
						className='pointer'
						onClick={() => history('/mis-pedidos')}
					/>

					<Text
						size='25px'
						color={theme.primary}
						weight='bold'
					>№ Pedido: {id}</Text>
				</div>

				<Text
					color={theme.primary}
					size='18px'
					weight='bold'
					className='mb-4'
				>{detailOrder.cliente_nombre_comercial}</Text>

				<span
					className={`badge-pill ${colorBadge[detailOrder.estado_roxfarma_abrev]} px-3 py-2 mb-4`}
				>{detailOrder.estado_roxfarma}</span>

				<div className='divider mb-5 mt-3'></div>
							
				<div className='row mb-5'>
					{
						[
							{
								title: 'Nº Pedido:',
								description: detailOrder.numped
							},
							{
								title: 'Linea de Crédito:',
								description: formatDecimals({ n: detailOrder.cliente_credito }),
								observacion_abrev: 'CR',
							},
							{
								title: 'Días de mora:',
								description: detailOrder.dias_mora,
								observacion_abrev: 'MR',
							},
							{
								title: 'Stock:',
								description: stockTotal,
								observacion_abrev: 'SK',
							},
							{
								title: 'Fecha de recepción:',
								description: detailOrder.fecha_entrega.slice(0, 10)
							},
							{
								title: 'Total pagado:',
								description: roundDecimals(total, 2)
							},
						].map((v, index) => (
							<Fragment key={index}>
								{
									matches ? null : <div className='col-1'></div>
								}
								<Text
									className={matches ? 'col-6' : 'col-5'}
									color={
										(index === 1 || index === 2 || index === 3)
										? detailOrder.observacion_abrev === v.observacion_abrev
											? theme.error : theme.primary
										: theme.primary
									}
								>{v.title}</Text>

								<Text
									className='col-6'
									color={
										(index === 1 || index === 2 || index === 3)
										? detailOrder.observacion_abrev === v.observacion_abrev
											? theme.error : theme.primary
										: theme.primary
									}
								>{v.description}</Text>
							</Fragment>
						))
					}

					{
						detailOrder.estado_roxfarma_abrev === 'RE' ? <>
							<div className='col-1'></div>
							<Text className={matches ? 'col-6' : 'col-5'} color={theme.error}>Motivo del rechazo</Text>
							<Text className='col-6' color={theme.error}>{detailOrder.observacion}</Text>
						</> : <>
							<div className='col-1'></div>
							<Text className={matches ? 'col-6' : 'col-5'} color={theme.primary}>Observación:</Text>
							<Text className='col-6' color={theme.primary}>{detailOrder.observacion}</Text>
						</>
					}
				</div>
				
				{
					data.map((v, index) => (
						<Fragment key={index}>
							<div className='row w-100'>
								<div className='col-1'></div>
								
								<Text
									color={theme.primary}
									weight='bold'
									className='col-11'
								>{v.nombre}</Text>
							</div>

							<div className='row w-100'>
								<div className='col-1'></div>
								
								<div className='col-11'>
									<Text>{v.presentacion}</Text>
								</div>
							</div>

							<div className='row my-3 w-100'>
								{
									matches ? null : <div className='col-1'></div>
								}

								<Text
									color={theme.primary}
									weight='bold'
									className='col-5'
								>{formatDecimals({ n: v.valor_neto })}</Text>

								<div className='col-6'>
									<Text
										color={theme.primary}
										weight='bold'
										className='text-center unidades py-2'
									>{v.cantidad_requerida} Unid</Text>
								</div>
							</div>
						</Fragment>
					))
				}

				{/* <Wizard /> */}

				{
					(detailOrder.estado_roxfarma_abrev === 'BR' && detailOrder.en_periodo)
					? <div className='px-4 w-100'>
						<Button
							classes='btn'
							fullWidth={true}
							handleClick={() => { void resendVerificationRequest() }}
						>Volver a enviar solicitud de verificación</Button>
					</div> : null
				}
			</div>
		</Container>
	);
}

export default MyOrdersPage;