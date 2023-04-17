import styled from 'styled-components';

interface ActiveStep {
    color: string;
}

export const Container = styled.section`
    .w-600 {
        width: 600px;
    }

    .divider {
        background-color: ${props => props.theme.colors.color2};
        height: 1px;
        width: 100%;
    }

    .unidades {
        background-color: ${props => props.theme.bg.primary};
        border-radius: 20px;
        width: 100px;
    }

    @media (max-width: 365px) {
        .btn {
            font-size: 12px;
        }
    }
`;

export const ContainerStep = styled.div`
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
`;

export const Step = styled.div<ActiveStep>`
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${props => props.color};

    @media (max-width: 426px) {
        width: 50px;
        height: 50px;
    }

    @media (max-width: 321px) {
        width: 40px;
        height: 40px;
    }
`;

export const Line = styled.div<ActiveStep>`
    width: 100%;
    height: 10px;
    background-color: ${props => props.color};
    position: absolute;
    z-index: -1;
    top: calc(50% - 5px);
    right: 0;
    left: calc(-50% - 20px);
    right: calc(50% - 20px);
    flex: 1 1 auto;

    @media (max-width: 426px) {
        height: 6px;
        top: calc(50% - 3px);
    }

    @media (max-width: 321px) {
        height: 3px;
        top: calc(50% - 1.5px);
    }
`;