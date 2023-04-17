import styled from 'styled-components';

interface Button {
	color: string;
	edge: 'start' | 'end' | null;
	fullWidth: boolean;
}

export const ButtonStyled = styled.button<Button>`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	border: 0;
	box-sizing: border-box;
	cursor: pointer;
	font-weight: 500;
	font-size: ${({ edge }: { edge: 'start' | 'end' | null }) =>
		edge !== null ? '0.675rem' : '0.875rem'};
	line-height: 1.75;
	letter-spacing: 0.02857em;
	min-width: 64px;
	padding: 6px 16px;
	border-radius: 20px;
	color: ${props => props.theme.white};
	background-color: ${({ color, theme }) => color === '' ? theme.colors.color3 : color};
	//box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

	&:hover {
		text-decoration: none;
		background-color: ${({ color, theme }) => color === '' ? theme.colors.color3 : color};
		filter: brightness(0.9);
		//box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
	}

	&:disabled {
		cursor: default;
		background: rgba(196, 196, 196, 0.5);
		color: #aaaaaa;
	}

	${({ fullWidth }) => (fullWidth ? 'width: 100%' : '')};

	img {
		width: 20px;
		margin-right: 10px;
	}

	span {
		margin: 0 10px;
	}

	&:focus {
		outline: none;
	}
`;