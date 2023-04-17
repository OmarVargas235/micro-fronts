import styled from 'styled-components';

export const Container = styled.section`
	.border-radius {
		border-radius: 20px;
	}

	.text-btn {
		font-size: 20px;
	}

	.container {
		width: 600px;

		@media (max-width: 576px) {
			width: 375px;
		}
	}
`;

export const ContainerImg = styled.div`
	background-color: ${props => props.theme.bg.primary};
	border-radius: 20px;
	width: 236px;
	height: 236px;

	img {
		width: 100%;
	}
`;