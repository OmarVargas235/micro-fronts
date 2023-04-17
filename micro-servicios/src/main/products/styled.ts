import styled from 'styled-components';

export const Container = styled.section`
	width: 600px;

	.border-radius {
		border-radius: 20px;
	}

	@media (max-width: 576px) {
		width: 300px;
	}
`;

export const Title = styled.h2`
	color: ${props => props.theme.primary};
	font-weight: bold;

	@media (max-width: 425px) {
		font-size: 22px;
	}
`;

export const ContainerIcons = styled.div`
	background-color: ${props => props.theme.bg.bg2};
	width: 90px;
	height: 90px;
	border-radius: 10px;

	.closeCircle {
		right: -30px;
	}
`;