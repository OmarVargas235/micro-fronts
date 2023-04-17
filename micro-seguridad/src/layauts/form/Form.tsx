import { Form as FormStyled } from './styled';

interface Props {
	children: JSX.Element | JSX.Element[];
	handleSubmit: Function;
	onSubmit: (v: object) => Promise<void>;
	className?: string;
}

const Form = ({ children, handleSubmit, onSubmit, className='' }: Props): JSX.Element => {
	return <FormStyled onSubmit={handleSubmit(onSubmit)} className={className}>{children}</FormStyled>;
};

export default Form;