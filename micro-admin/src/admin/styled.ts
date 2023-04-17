import styled from "styled-components";
import background from '../assets/mask_group.png';

export const Container = styled.section`
    min-height: 100vh;
`;

export const ContainerModal = styled.section`
    .input-radius {
        border-radius: 20px;
    }

    .label {
        font-weight: bold;
    }

    .btn {
        width: 100%;
    }
`;

export const Row = styled.div`
    background-color: #005AB1;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;

    .btn-users {
        color: #2E78C1;
    }

    .btn {
        font-weight: bold;
        
        @media (max-width: 992px) {
            padding: 6px;

            span {
                margin: 0;
                margin-left: 2px;
            }
        }
    }
`;

export const ContainerIconAction = styled.div<{ color: string; }>`
    background-color: ${props => props.color};
    width: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Img = styled.img`

`;

export const ModalSesion = styled.div`
    background-color: white;
    border-radius: 10px;
    right: 0;
    width: 150px;
    -webkit-box-shadow: 7px 18px 18px 0px rgba(0,0,0,0.18);
    -moz-box-shadow: 7px 18px 18px 0px rgba(0,0,0,0.18);
    box-shadow: 7px 18px 18px 0px rgba(0,0,0,0.18);

    .hover {
        transition: background-color .1s ease-in;
        border-radius: 4px;

        &:hover {
            background-color: rgba(0,0,0,.1);
        }
    }
`;