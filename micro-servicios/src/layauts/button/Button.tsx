import { ButtonStyled } from './styled';

type TypeChildren = JSX.Element | JSX.Element[] | string;

interface Props {
	children: TypeChildren;
	classes?: string;
	classessText?: string;
	color?: string;
	fullWidth?: boolean;
	icon?: JSX.Element;
	edge?: 'start' | 'end' | null;
	type?: 'button' | 'submit';
	handleClick?: () => void;
	disabled?: boolean;
	dataClose?: 'close' | '';
}

const Button = ({
	children,
	classes = '',
	classessText = '',
	color = '',
	fullWidth = false,
	icon,
	edge = null,
	disabled = false,
	type = 'button',
	handleClick = () => {},
	dataClose = '',
}: Props): JSX.Element => {
	return (
		<ButtonStyled
			className={classes}
			color={color}
			fullWidth={fullWidth}
			edge={edge}
			type={type}
			onClick={handleClick}
			disabled={disabled}
			data-close={dataClose}
		>
			{edge === 'start' && icon}

			<span
				data-close={dataClose}
				className={classessText}
			>{children}</span>

			{edge === 'end' && icon}
		</ButtonStyled>
	);
};

export default Button;