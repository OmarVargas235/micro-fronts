// 1. librerias
import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';

// 2.- estilos
import { Container, ContainerModal, Body } from './styled';

// 3.- iconos
import { BiXCircle } from "react-icons/bi";

// 4.- components
import Button from '../button/Button';
import Animation, { timeClose } from '../animation/Animation';

interface Props {
    children: JSX.Element | JSX.Element[];
    open: boolean;
    closeModal: (isClose: boolean) => void;
    classess?: string;
    textBtn: string;
    isButton?: boolean;
    width?: string;
}

let timeout: string | number | NodeJS.Timeout | undefined;

const Modal = ({ children, open, closeModal, classess='', textBtn, isButton=true, width='100%' }: Props): JSX.Element => {

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [isMounted, setIsMounted] = useState<boolean>(true);
    const [isScrollY, setIsScrollY] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(0);
    const [windowHeight, setWindowHeight] = useState<number>(0);
    const [isClose, setIsclose] = useState(false);

    useEffect(() => {

        if (!isMounted) return;
        
        window.addEventListener('resize', () => setWindowHeight(window.innerHeight));

        return () => {

            window.removeEventListener('resize', () => setWindowHeight(window.innerHeight));
            setIsMounted(false);
        }

    }, [isMounted]);

    // Agregar scroll si el modal es mas grande que el alto de la pantalla
    useLayoutEffect(() => {

        const { current } = containerRef;

        if (current === null) return;

        const { offsetHeight } = current;
        const { innerHeight } = window;

        setIsScrollY(offsetHeight >= innerHeight);
        offsetHeight >= innerHeight && setHeight(innerHeight);

    }, [containerRef, windowHeight, open]);

    const close = (): void => {

        clearTimeout(timeout);

        window.setTimeout(() => {

            setIsclose(false);
            closeModal(false);

        }, timeClose);

        setIsclose(true);
    }

    const closeDiv = (e: MouseEvent<HTMLDivElement>): void => {
        
        const target: HTMLDivElement = e.target as HTMLDivElement;
        target.dataset.close === 'close' && close();
    }

    return <>
        {
            open ? <Container
                className='d-flex justify-content-center align-items-center'
                onClick={closeDiv}
                data-close="close"
            >
                <Animation isClose={isClose}>
                    <ContainerModal
                        height={height}
                        isScrollY={isScrollY}
                        ref={containerRef}
                        width={width}
                    >
                        <div className='d-flex justify-content-end mb-4'>
                            <BiXCircle
                                onClick={close}
                                size={25}
                                className="pointer"
                            />
                        </div>
            
                        <Body className={classess}>
                            { children }

                            {
                                isButton ? <div className='d-flex justify-content-center mt-4'>
                                    <Button
                                        classes='btn'
                                        dataClose="close"
                                    >{textBtn}</Button>
                                </div> : null
                            }
                        </Body>
                    </ContainerModal>
                </Animation>
            </Container> : null
        }
    </>
}

export default Modal;