import styled from 'styled-components';

export const Container = styled.section`

    .bg-white {
        background-color: ${props => props.theme.white};
        border-radius: 20px;
        border: none;
        -webkit-box-shadow: -1px 13px 13px -4px rgba(204,196,197,1);
        -moz-box-shadow: -1px 13px 13px -4px rgba(204,196,197,1);
        box-shadow: -1px 13px 13px -4px rgba(204,196,197,1);
    }

    .input {
        top: -20px;
    }

    .input-product {
        width: 60px !important;

        input {
            padding: 2px;
            text-align: center;
        }
    }

    @media (min-width: 576px) {
        .px-sm-5 {
            padding-left: 60px !important;
            padding-right: 60px !important;
        }
    }

    @media (min-width: 700px) {
        .px-sm-5 {
            padding-left: 90px !important;
            padding-right: 90px !important;
        }
    }
`;

export const Header = styled.div`
    background-color: ${props => props.theme.colors.color3};
    color: ${props => props.theme.white};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`;

export const ContainerIconBox = styled.div`
    background-color: ${props => props.theme.bg.bg1};
    width: 60px;
    height: 60px;
    border-radius: 50%;

    svg {
        left: calc(30px - 15px);
    }

    @media (max-width: 350px) {
        width: 50px;
        height: 50px;

        svg {
            width: 25px !important;
            height: 25px !important;
        }
    }
`;

export const ContainerIcon = styled.div`
    border: 1px solid #61ACFC;
    width: 30px;
    height: 30px;
    border-radius: 4px;

    @media (max-width: 300px) {
        width: 25px;
        height: 25px;
    }
`;

export const ContainerCards = styled.div`
    @media (max-width: 576px) {
        .px-3 {
            padding-left: 90px !important;
            padding-right: 90px !important;
        }
    }

    @media (max-width: 500px) {
        .px-3 {
            padding-left: 50px !important;
            padding-right: 50px !important;
        }
    }

    @media (max-width: 400px) {
        .px-3 {
            padding-left: 16px !important;
            padding-right: 16px !important;
        }
    }

    @media (max-width: 325px) {
        .px-3 {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .mr-3 {
            margin-right: 0 !important;
        }

        .col-3 {
            -webkit-box-flex: 0 !important;
            -ms-flex: 0 0 33.333333% !important;
            flex: 0 0 33.333333% !important;
            max-width: 33.333333% !important;
        }
    }
`;

export const Footer = styled.div`
    -webkit-box-shadow: -2px 2px 5px 0px rgba(245,245,245,1);
    -moz-box-shadow: -2px 2px 5px 0px rgba(245,245,245,1);
    box-shadow: -2px 2px 5px 0px rgba(245,245,245,1);
    background-color: ${props => props.theme.white};

    .text1 {
        font-size: 14px;
    }

    .text2 {
        font-size: 18px;
    }

    @media (max-width: 320px) {
        .btn {
            font-size: 12px;
        }
    }

    @media (max-width: 300px) {
        .btn {
            font-size: 10px;
        }
    }
`;

export const ContainerCard = styled.div`
    @media (max-width: 300px) {
        .col-xs-2 {
            -webkit-box-flex: 0 !important;
            -ms-flex: 0 0 25.666667% !important;
            flex: 0 0 25.666667% !important;
            max-width: 25.666667% !important;
        }
    }
`;

export const ContainerImg = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 8px;

    @media (max-width: 300px) {
        width: 40px;
        height: 40px;
    }
`;