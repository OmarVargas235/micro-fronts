import styled from 'styled-components';

export const Container = styled.section<{ isVoucher: boolean; }>`
	@media (min-width: 375px) {
		.px-2 {
			padding-left: 20px !important;
			padding-right: 20px !important;
		}
	}

	@media (max-width: 300px) {
		.px-2 {
			padding-left: 0px !important;
			padding-right: 0px !important;
		}

		.col-3 {
			-webkit-box-flex: 0 !important;
			-ms-flex: 0 0 33.333333% !important;
			flex: 0 0 33.333333% !important;
			max-width: 33.333333% !important;
		}

		.ml-1 {
			margin-left: 0 !important;
		}
	}

	${props => props.isVoucher ? `
		.container {
			@media (min-width: 500px) {
				width: 600px;
			}
		}
	` : ''}
`;

export const Switch = styled.div`
	background-color: ${props => props.theme.bg.bg4};
	border-radius: 50%;

	.icon {
		width: 25px;
		height: 25px;
		border-radius: 50%;
	}

	.minus {
		background-color: ${props => props.theme.bg.secondary};
	}

	.plus {
		background-color: ${props => props.theme.colors.color3};
	}
`;

export const Box = styled.div<{ isSelected: boolean; }>`
	border: ${props => props.isSelected ? '3px solid rgb(65, 87, 255)' : '1px solid #F0F1F5'};
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

export const Table = styled.div<{ isScroll: boolean; }>`
	${props => props.isScroll ? 'overflow-y: scroll; height: 400px' : ''};
`;