import { ChangeEvent, useState } from 'react';
import { ContainerTextField, Input, ContainerInput, HelperText, Textarea } from './styled';

interface Props {
	classes?: string;
	classesInput?: string;
	classesContainerInput?: string;
	icon?: JSX.Element | null;
	icon2?: JSX.Element | null;
	edge?: 'start' | 'end' | null;
	edge2?: 'start' | 'end' | null;
	placeholder?: string;
	label?: string;
	type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'textarea';
	name: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleChangeTextarea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	value: string | number;
	isReadOnly?: boolean;
	isError?: boolean;
	isFull?: boolean;
	helperText?: string;
	colorHelperText?: string;
	weightHelperText?: string;
	sizeHelperText?: string;
	autocomplete?: 'on' | 'off';
	refInput?: { current: HTMLInputElement | null };
	id?: string;
}

const TextField = ({
	classes = '',
	classesInput = '',
	classesContainerInput = '',
	icon = null,
	icon2 = null,
	edge = null,
	edge2 = null,
	placeholder = '',
	label = '',
	type = 'text',
	name,
	handleChange,
	handleChangeTextarea,
	value,
	isReadOnly = false,
	isError = false,
	isFull = false,
	helperText = '',
	colorHelperText = '',
	weightHelperText = '',
	sizeHelperText = '',
	autocomplete = 'on',
	refInput = { current: null },
	id = '',
}: Props): JSX.Element => {

	const [isFocus, setIsFocus] = useState<boolean>(false);
	
	return (
		<ContainerTextField
			className={classes}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}>
			{label !== '' ? <span className='label'>{label}</span> : null}

			<ContainerInput
				isFocus={isFocus}
				edge={edge}
				isError={isError}
				isFull={isFull}
				className={`${classesContainerInput} w-100`}
			>
				{edge === 'start' && type !== 'textarea' ? icon : null}
				{edge2 === 'start' && type !== 'textarea' ? icon2 : null}

				{
					type === 'textarea' ? <Textarea
						placeholder={placeholder}
						name={name}
						onChange={handleChangeTextarea}
						value={value}
						readOnly={isReadOnly}
						rows={4}
						className='w-100'
						autoComplete={autocomplete}
					></Textarea>
					: <Input
						placeholder={placeholder}
						type={type}
						name={name}
						onChange={handleChange}
						value={value}
						readOnly={isReadOnly}
						className={`${id} ${classesInput}`}
						autoComplete={autocomplete}
						ref={refInput}
					/>
				}

				{edge === 'end' && type !== 'textarea' ? icon : null}
				{edge2 === 'end' && type !== 'textarea' ? icon2 : null}
			</ContainerInput>

			{
				helperText.length === 0
				? null
				: <HelperText
					color={colorHelperText}
					weight={weightHelperText}
					size={sizeHelperText}
				>{helperText}</HelperText>
			}
		</ContainerTextField>
	);
};

export default TextField;