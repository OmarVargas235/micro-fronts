// 1.- librerias
import { useContext } from 'react';

// 2.- componentes
import Header from '../container/Header';
import Table from '../../layauts/table/Table';
import Button from '../../layauts/button/Button';
import Modal from '../../layauts/modal/Modal';
import FormCreate from '../container/FormCreate';
import FormEdit from '../container/FormEdit';
import PasswordParameters from '../container/PasswordParameters';
import CotainerIcon from '../../layauts/cotainerIcon/CotainerIcon';

// 3.- estilos
import { Container, Row, Img, ContainerModal } from '../styled';

// 4.- utils
import { thead, tbody } from '../utils';
import { AdminContext } from '../AdminProvider';

// 5.- imagenes
import logoroxfarma from '../../assets/logoroxfarma.png';

// 6.- iconos
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface Props {
    refresh: () => void;
    addUser: () => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    deleteUser: (v: number, isDelete?: boolean) => Promise<void>;
    isOpenModalDelete: boolean;
    setIsOpenModalDelete: (value: boolean) => void;
    idUser: number;
}

const AdminPage = ({ refresh, addUser, isOpen, setIsOpen, deleteUser, isOpenModalDelete, setIsOpenModalDelete, idUser }: Props): JSX.Element => {

    const { state:{ dataUsers, isEdit, isUserManagement }, dispatch } = useContext(AdminContext);

    return <>
        <Container className='row'>
            <Row className='col-3 col-xxl-2'>
                <Img
                    src={logoroxfarma}
                    alt='logoroxfarma'
                    className='img-fluid mt-5'
                />

                <Button
                    classes={`mt-5 btn ${isUserManagement ? 'btn-users' : ''}`}
                    color={isUserManagement ? '#DFECFF' : 'transparent'}
                    edge='start'
                    icon={<AiOutlineUser size={20} />}
                    fullWidth={true}
                    handleClick={() => dispatch({ type: 'IS_USER_MANAGEMENT', payload: true })}
                >Gestión de usuarios</Button>

                <Button
                    edge='start'
                    icon={<BiLockAlt size={20} />}
                    color={!isUserManagement ? '#DFECFF' : 'transparent'}
                    classes={`my-4 btn ${!isUserManagement ? 'btn-users' : ''}`}
                    fullWidth={true}
                    handleClick={() => dispatch({ type: 'IS_USER_MANAGEMENT', payload: false })}
                >Parametros contraseña</Button>

                <Button
                    color='transparent'
                    classes='my-4 btn'
                    classessText='small font-weight-bold'
                    fullWidth={true}
                    handleClick={() => (window.location.href = '/home')}
                >Home</Button>
            </Row>
            
            <div className='col-9 col-xxl-10 p-4 p-lg-5'>
                <Header
                    isUserManagement={isUserManagement}
                />

                <div className='my-4'></div>

                {
                    isUserManagement ? <Table
                        thead={thead}
                        tbody={tbody(dataUsers, setIsOpen, dispatch, deleteUser)}
                        width='180px'
                        refresh={refresh}
                        addUser={addUser}
                    /> : <PasswordParameters

                    />
                }
            </div>
        </Container>

        <ContainerModal>
            <Modal
                closeModal={(v) => setIsOpen(v)}
                open={isOpen}
                textBtn=''
                isButton={false}
            >
                { isEdit ? <FormEdit setIsOpen={setIsOpen} /> : <FormCreate /> }
            </Modal>
        </ContainerModal>

        <ContainerModal>
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
                
                <p>Estas seguro de eliminar este usuario?</p>

                <div className='d-flex'>
                    <Button
                        classes='mr-2'
                        color='#1e7e34'
                        handleClick={() => {void deleteUser(idUser, true)}}
                    >Aceptar</Button>
                    
                    <Button color='#dc3545' dataClose='close'>Rechazar</Button>
                </div>
            </Modal>
        </ContainerModal>
    </>
}

export default AdminPage;