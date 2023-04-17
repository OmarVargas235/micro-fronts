// 1. librerias
import { MouseEvent, useContext, useState } from 'react';

// 2.- estilos
import { Container, ContainerModal, Body } from './styled';

// 3.- iconos
import { BiXCircle } from "react-icons/bi";
import { AiFillCloseCircle, AiFillCheckCircle, AiFillWarning } from "react-icons/ai";

// 4.- components
import Button from '../button/Button';
import { Text } from '../Text';
import { GlobalContext } from '../../context/GlobalProvider';
import Animation, { timeClose } from '../animation/Animation';

// 5.- services
import { auth } from '../../service/auth';

// 6.- theme
import { theme } from '../../theme/theme';

let timeout: string | number | NodeJS.Timeout | undefined;

const expireSesion = 'Lo sentimos, la sesión ha expirado';

const Alert = (): JSX.Element => {

    const { state:{ isAlert, isAlertSuccess, messageAlert }, dispatch } = useContext(GlobalContext);

    const [isClose, setIsclose] = useState(false);

    const close = (): void => {

        clearTimeout(timeout);

        window.setTimeout(() => {

            setIsclose(false);
            dispatch({ type: 'IS_ALERT', payload: false });

        }, timeClose);

        setIsclose(true);
    }

    const closeDiv = (e: MouseEvent<HTMLDivElement>): void => {
        
        const target: HTMLDivElement = e.target as HTMLDivElement;
        target.dataset.close === 'close' && close();

        messageAlert === expireSesion && (window.location.href = '/login');
        messageAlert === expireSesion && auth.logout();
    }

    return <>
        {
            isAlert ? <Container
                className='d-flex justify-content-center align-items-center'
                onClick={closeDiv}
                data-close="close"
            >
                <Animation isClose={isClose}>
                    <ContainerModal>
                        <div className='d-flex justify-content-end mb-4'>
                            <BiXCircle
                                onClick={close}
                                size={25}
                                className="pointer"
                            />
                        </div>

                        <Body className='d-flex flex-column align-items-center justify-content-center'>
                            {
                                isAlertSuccess ? <AiFillCheckCircle
                                    size={45}
                                    color={theme.icons.check}
                                />
                                : messageAlert === expireSesion
                                    ? <AiFillWarning
                                        size={45}
                                        color={theme.warning}
                                    />
                                    : <AiFillCloseCircle
                                        size={45}
                                        color={theme.icons.error}
                                    />
                            }

                            <Text className='my-4 text-center' color={theme.text.midgray} size='18px'>{messageAlert}</Text>

                            <Button
                                classes='btn'
                                dataClose="close"
                            >Entendido</Button>
                        </Body>
                    </ContainerModal>
                </Animation>
            </Container> : null
        }
    </>
}

export default Alert;