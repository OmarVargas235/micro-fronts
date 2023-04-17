import styled from 'styled-components';

export const Container = styled.section`
    background-color: rgba(0, 0, 0, .6);
    min-height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 1050;
    top: 0;
`;

export const ContainerModal = styled.div`
    border-radius: 6px;
    width: 330px;
    background-color: ${props => props.theme.white};
    padding: 20px;
`;

export const Body = styled.div`

`;