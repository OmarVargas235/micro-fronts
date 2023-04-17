import styled from "styled-components";

interface Props {
    color?: string;
    colorLetter?: string;
    width?: string;
    height?: string;
}

const Avatar = styled.div<Props>`
    width: ${props => props.width ?? '40px'};
    height: ${props => props.height ?? '40px'};
    background-color: ${props => props.color ?? props.theme.bg.bg1};
    color: ${props => props.colorLetter ?? props.theme.white};
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Avatar;