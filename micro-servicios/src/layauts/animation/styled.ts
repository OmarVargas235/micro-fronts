import styled from "styled-components";

export const Container = styled.div<{ animation: 'into' | 'out', isInto: boolean }>`
    transform: translateY(${props => props.isInto ? '-200%' : '0'});
    opacity: ${props => props.isInto ? 0 : 1};
    
    animation: ${props => props.isInto ? 'into' : 'out'} .5s ease-in-out forwards;

    @keyframes into {
        from { transform: translateY(-50%); opacity: 0; }
        to { transform: translateY(0);opacity: 1; }
    }

    @keyframes out {
        from { transform: translateY(0%); opacity: 1; }
        to { transform: translateY(-40%); opacity: 0; }
    }
`;