import styled from 'styled-components';

export const Container = styled.section`
	width: 600px;
	
	img {
		border-radius: 10px;
	}

	.border-radius {
		border-radius: 30px;
	}

	@media (max-width: 576px) {
		width: 300px;
	}
`;

export const Title = styled.h2`
	color: #090F47;
	font-weight: bold;

	@media (max-width: 425px) {
		font-size: 25px;
	}
`;

export const ContainerIcons = styled.div`
	background-color: #EFEFEF;
	width: 90px;
	height: 90px;
	border-radius: 10px;

	.closeCircle {
		right: -30px;
	}
`;