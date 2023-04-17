// 1.- Librerias

// 2.- componentes
import Modal from '../../../layauts/modal/Modal';
import CotainerIcon from '../../../layauts/cotainerIcon/CotainerIcon';
import { Text } from '../../../layauts/Text';
import Button from '../../../layauts/button/Button';

// 3.- interfaces
import { Modal as IModal } from '../container/Summary';

interface Props {
    modal: IModal;
    setModal: (value: IModal) => void;
    closeModal: () => void;
    generateOrder: () => Promise<void>;
}

const ContainerModalPage = ({ modal, setModal, closeModal, generateOrder }: Props): JSX.Element => {

    return (<>
        {
            modal.isCheck ?
            <Modal
                closeModal={closeModal}
                textBtn=''
                open={modal.isActive}
                width='300px'
                isButton={false}
            >
                <div className='text-center'>{ modal.icon }</div>

                <Text
                    className='text-center mb-4'
                    color='#303030'
                    size='24px'
                    weight='bold'
                >{modal.title}</Text>

                <Text
                    className='text-center mb-2'
                    color='#4F5A84'
                >{modal.text1}</Text>
                
                <Text className='text-center' color='#4F5A84'>{modal.text2}</Text>

                <div className='d-flex mt-4'>
                    <Button
                        fullWidth={true}
                        color='#226EB5'
                        classes='mr-3'
                        handleClick={() => { void generateOrder() }}
                    >Si</Button>

                    <Button
                        fullWidth={true}
                        color='#13A000'
                        handleClick={closeModal}
                    >No</Button>
                </div>
            </Modal> :
            <Modal
                closeModal={closeModal}
                textBtn="Entendido"
                open={modal.isActive}
                width='300px'
            >
                <CotainerIcon
                    icon={modal.icon}
                    isCheck={modal.isCheck}
                />

                <Text className='text-center'>{modal.title}</Text>
            </Modal>
        }
    </>);
}

export default ContainerModalPage;