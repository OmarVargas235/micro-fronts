import styled from 'styled-components';

export const Container = styled.section`
`;

export const CotainerBody = styled.div`
	width: 600px;

	@media (max-width: 576px) {
		width: 400px;

		.w-50 {
			width: 65% !important;
		}
	}

	@media (max-width: 424px) {
		.ml-2 {
			margin: 0 !important;
			width: 60% !important;
		}
	}
`;

export const Header = styled.div`
	background-color: ${props => props.theme.bg.secondary};
`;

export const Body = styled.div`
	border-top-left-radius: 50px;
	border-top-right-radius: 50px;
	top: -90px;
	background-color: ${props  => props.theme.white};
`;

export const Title = styled.h2`
	color: ${props => props.theme.primary};
	font-weight: bold;

	@media (max-width: 425px) {
		font-size: 25px;
	}
`;

export const ContainerCards = styled.div`
	p {
		margin: 0;
		font-size: 17px;
		font-weight: 600;
	}

	svg {
		path {
			stroke: rgb(27, 136, 251);
		}
	}

	.card {
		-webkit-box-shadow: 3px -1px 16px -12px rgba(0,0,0,0.75);
		-moz-box-shadow: 3px -1px 16px -12px rgba(0,0,0,0.75);
		box-shadow: 3px -1px 16px -12px rgba(0,0,0,0.75);
		border-radius: 20px;
		height: 220px;
		transition: background-color .2s ease-in-out, color .2s ease-in-out;
		
		&:hover {
			background-color: ${props  => props.theme.bg.bg1};

			p {
				color: ${props  => props.theme.white};
				font-weight: 600;
			}
		}

		@media (max-width: 576px) {
			width: 150px;
			height: 154px;
			
			p {
				font-size: 13px;
			}

			svg {
				width: 33px;
				height: 33px;
			}
		}

		@media (max-width: 370px) {
			width: 130px;
			height: 134px;
		}

		@media (max-width: 370px) {
			width: 125px;
			height: 129px;
		}
	}

	.container-icon {
		background-color: ${props => props.theme.bg.primary};
		border-radius: 50%;
		width: 80px;
		height: 80px;

		@media (max-width: 370px) {
			width: 55px;
			height: 55px;
		}
	}
`;