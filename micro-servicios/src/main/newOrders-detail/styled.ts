import styled from 'styled-components';

export const Container = styled.section`
	.text {
		text-transform: uppercase;
	}

    @media (min-width: 650px) {
        width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const ContainerIconBox = styled.div`
    background-color: ${props => props.theme.bg.bg1};
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const ContainerImg = styled.div`
	background-color: ${props => props.theme.bg.bg3};
	border-radius: 20px;

	img {
		width: 200px;
	}
`;

export const Box = styled.div<{ isActive: boolean; }>`
	border: ${props => `2px solid ${props.isActive ? '#51A4FB' : 'transparent'}`};
	background-color: ${props => props.isActive ? '#F4F8FB' : '#F5F5F5'};
	width: 110px;
	height: 90px;
	border-radius: 10px;
`;

export const ContainerIcon = styled.div`
    border: 1px solid #61ACFC;
    width: 30px;
    height: 30px;
    border-radius: 4px;
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

    .container-footer {
        width: 100%;
    }

    @media (min-width: 650px) {
        .container-footer {
            width: 600px;
        }
    }
`;