// 1.- librerias
import { useState, useEffect } from "react";

// 2.- componentes

// 3.- estilos
import { Container } from "./styled";

interface Props {
    children: JSX.Element | JSX.Element[];
    isClose: boolean;
}

export const timeClose = 520;

const Animation = ({ children, isClose }: Props): JSX.Element => {

    const [animation, setAnimation] = useState<'into' | 'out'>('into');

    useEffect(() => {isClose && setAnimation('out')}, [isClose]);

    return <Container
        animation={animation}
        isInto={animation === 'into'}
    >{children}</Container>
}

export default Animation;