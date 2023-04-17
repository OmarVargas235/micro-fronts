import styled from "styled-components";

export const Container = styled.div<{ isError: boolean; }>`
    border: ${props => props.isError ? `2px solid ${props.theme.error}` : `1px solid  ${props.theme.colors.color2}`};
    border-radius: 4px;
    height: 47px;
`;

export const ContainerAutoComplete = styled.div`
    .radius {
        border-radius: 30px;
    }
`;

export const Current = styled.div`
`;

export const ContainerOptions = styled.div`
    border: 1px solid #96989D;
    background-color: ${props => props.theme.white};
    top: 110%;
    left: 0;
    z-index: 1;
`;

export const Option = styled.div<{ isActive: boolean; }>`
    transition: .1s background-color ease-in, .1s color ease-in;

    ${props => props.isActive ? 'background-color: #2879A7' : ''};
    ${props => props.isActive ? 'color: white' : ''};
    
    &:hover {
        background-color: #2879A7;
        color: white;
    }
`;

export const Label = styled.span`
    margin-bottom: 10px;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #656E93;
`;