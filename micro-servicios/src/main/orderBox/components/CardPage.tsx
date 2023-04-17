// 1.- librerias

// 2.- components
import { Text } from '../../../layauts/Text';
import Modal from '../../../layauts/modal/Modal';
import CotainerIcon from '../../../layauts/cotainerIcon/CotainerIcon';
import Button from '../../../layauts/button/Button';

// 3.- iconos
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus, AiOutlineCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

// 4.- styles
import { Switch } from '../styled';

// 5.- interfaces
import { Lista } from '../../../service/orders';

// 6.- hooks
import { useMediaQuery } from '../../../hooks/useMediaQuery';

// 7.- utils
import { formatDecimals } from '../../../helpers/utils';

// 8.- theme
import { theme } from '../../../theme/theme';

interface Props {
    data: Lista;
    deleteProduct: (id: number, isDelete: boolean) => void;
    handleClick: (isPlus: boolean) => void;
    isOpenModalDelete: boolean;
    setIsOpenModalDelete: (isPlus: boolean) => void;
}

const Card = ({ data, deleteProduct, handleClick, isOpenModalDelete, setIsOpenModalDelete }: Props): JSX.Element => {

    const matches = useMediaQuery('(max-width: 400px)');

    return <div className='row px-0 col-12 col-md-6 col-lg-4 mb-5'>
        <div className='col-3'>
            <div
                className='bg-secondary p-2'
                style={{ width: '70px', height: '70px', borderRadius: '8px' }}
            >
                {/* {
                    <img
                        src={data.img}
                        alt="boticaria"
                        className='img-fluid'
                    />
                } */}
            </div>
        </div>

        <div className='col-4 ml-1'>
            <Text
                size={matches ? '14px' : '16px'}
                color={theme.primary}
                weight='bold'
                className='pointer'
            >{data.nombre_articulo}</Text>
            
            <div>
                <Text>{data.presentacion_articulo}</Text>

                <Text color={theme.primary} weight='600'>{
                    formatDecimals({ n: data.precio_venta_unidad, nDecimals: 5 })
                }</Text>
            </div>
        </div>

        <div className='col-4'>
            <div className='d-flex justify-content-end mb-4'>
                <AiOutlineCloseCircle
                    color='#D9D9D9'
                    size={25}
                    className='pointer'
                    onClick={() => deleteProduct(data.id_articulo, false)}
                />
            </div>

            <Switch className='d-flex justify-content-between'>
                <div className='minus icon d-flex justify-content-center align-items-center'>
                    <AiOutlineMinus
                        color={theme.colors.color4}
                        size={20}
                        className='pointer'
                        onClick={() => handleClick(false)}
                    />
                </div>

                <Text color={theme.primary} weight='600'>{data.cantidad}</Text>

                <div className='plus icon'>
                    <BsPlus
                        color={theme.white}
                        size={25}
                        className='pointer'
                        onClick={() => handleClick(true)}
                    />
                </div>
            </Switch>
        </div>

        <Modal
            closeModal={(v) => setIsOpenModalDelete(v)}
            open={isOpenModalDelete}
            textBtn=''
            isButton={false}
            classess='modal-delete'
            width='300px'
        >
            <CotainerIcon
                icon={<MdDelete size={30} />}
                isCheck={false}
            />
            
            <p className='text-center'>Estas seguro de eliminar este producto?</p>

            <div className='d-flex justify-content-center w-100'>
                <Button
                    classes='mr-2'
                    color='#1e7e34'
                    handleClick={() => {void deleteProduct(data.id_articulo, true)}}
                >Aceptar</Button>
                
                <Button color='#dc3545' dataClose='close'>Rechazar</Button>
            </div>
        </Modal>
    </div>
}

export default Card;