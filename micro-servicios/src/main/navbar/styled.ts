import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    text-align: center;
    bottom: 0;
    background-color: ${props => props.theme.white};
    -webkit-box-shadow: -4px -4px 21px -7px rgba(0,0,0,0.75);
    -moz-box-shadow: -4px -4px 21px -7px rgba(0,0,0,0.75);
    box-shadow: -4px -4px 21px -7px rgba(0,0,0,0.75);
`;