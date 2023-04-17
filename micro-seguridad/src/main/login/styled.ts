import styled from 'styled-components';

export const Container = styled.section`
	min-height: 100vh;
`;

export const Title = styled.h2`
	color: ${props => props.theme.primary};
	font-weight: bold;
	font-size: 24px;
`;

export const ContainerForm = styled.div`
	border: 2px solid ${props => props.theme.colors.color2};
	padding: 20px;
	border-radius: 6px;

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

	.checkbox {
		font-size: 12px;

		* {
			margin-top: 0;
			margin-bottom: 0;
		}
	}
`;

export const TitleModal = styled.h2`
	color: #303030;
	font-size: 22px;
`;

export const TextModal = styled.p`
	color: #4F5A84;
`;