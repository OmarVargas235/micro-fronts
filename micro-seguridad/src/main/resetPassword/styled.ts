import styled from 'styled-components';

const mediaQueryWidth = (): string => (`
	width: 400px;
	
	@media (max-width: 425px) {
		width: 300px;
	}
`);

export const Container = styled.section`
	min-height: 100vh;

	.container-arrow-left {
		${ mediaQueryWidth() };
	}
`;

export const ContainerForm = styled.div`
	border: 2px solid ${props => props.theme.colors.color2};
	padding: 40px 20px;
	border-radius: 6px;
	${ mediaQueryWidth() };

	.input {
		border-top: none;
		border-right: none;
		border-left: none;
		border-radius: 0;
	}

	.btn {
		border-radius: 30px;
		font-size: 15px;
		padding: 8px 0;
	}
`;

export const Title = styled.h2`
	color: ${props => props.theme.primary};
	font-weight: bold;
	font-size: 24px;

	${ mediaQueryWidth() };
`;

export const Text = styled.p`
	color: #8C92AE;
	${ mediaQueryWidth() };
`;

export const ContainerIcon = styled.div`
	.position-absolute {
		right: -15px;
		top: calc(50% - 20px);
	}
`;