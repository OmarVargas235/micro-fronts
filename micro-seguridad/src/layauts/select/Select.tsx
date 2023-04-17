// 1.- librerias
import { useState, useEffect, ChangeEvent, useRef, useLayoutEffect } from 'react';

// 2.- estilos
import { Container, Current, ContainerOptions, Option, Label, ContainerAutoComplete } from './styled';

// 3.- componentes
import TextField from '../textField/TextField';
import { Text } from '../Text';

// 4.- iconos
import { RiArrowUpSFill } from 'react-icons/ri';

// 5.- theme
import { theme } from '../../theme/theme';

export interface IOption {
    label: string;
    value: number | string;
}

interface Props {
    options: IOption[];
    handleChange: (v: IOption) => void;
    className?: string;
    classNameSelect?: string;
    label?: string;
    value?: number;
    isError?: boolean;
    readonly?: boolean;
    isSearch?: boolean;
}

let timeout: string | number | NodeJS.Timeout | undefined;

const Arrows = ({ currentValue, isSearch=false }: { currentValue: string; isSearch?: boolean; }): JSX.Element => (
    <div
        className={`d-flex align-items-center pr-2 justify-content-${isSearch ? 'end' : 'between w-100'}`}
        id='closeSelect'
    >
        {
            isSearch ? null : <Current id='closeSelect'>{currentValue}</Current>
        }

        <div className='d-flex flex-column ml-2' id='closeSelect'>
            <RiArrowUpSFill size={12} style={{ color: theme.text.darkgray }} id='closeSelect' />
            <RiArrowUpSFill
                size={12}
                style={{ transform: 'rotateZ(180deg)', color: theme.text.darkgray }}
                id='closeSelect'
            />
        </div>
    </div>
);

const Select = ({ options, handleChange, className='', classNameSelect='', label='', value=-1, isError=false, readonly=false, isSearch=false }: Props): JSX.Element => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>('');
    const [optionsLocal, setOptionsLocal] = useState<IOption[]>([]);

    useLayoutEffect(() => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('click', (e: any) => {

            if (e.path === undefined) return;

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            const isClassId = !(e.path[0].getAttribute('class')?.includes('closeSelect'));

			if (e.path[0].getAttribute('id') !== 'closeSelect' && isClassId)
                setOpen(false);
		});

        return () => {

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
			window.removeEventListener('click', (e: any) => {

                if (e.path === undefined) return;
            
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                const isClassId = !(e.path[0].getAttribute('class')?.includes('closeSelect'));

                if (e.path[0].getAttribute('id') !== 'closeSelect' && isClassId)
                    setOpen(false);
            });
        }

    }, []);

    useEffect(() => setOptionsLocal(options), [options]);

    useEffect(() => setCurrentValue(options[0].label), []);

    useEffect(() => {
        
        if (value === -1) return;

        const findValue = options.find(v => value === v.value);

        if (findValue === undefined) return;
        findValue.value !== -1 && setCurrentValue(findValue.label); 

    }, [value, options]);

    const handleSelect = (option: IOption): void => {

        setCurrentValue(option.label);
        handleChange(option);
    }

    const search = (e: ChangeEvent<HTMLInputElement>): void => {

        clearTimeout(timeout);

        const { value } = e.target;
        const filter = options.filter(v => v.label.toLowerCase().includes(value.toLowerCase()));

        setOptionsLocal(filter);
        setCurrentValue(value);
    }

    const handleClick = (): void => {

        const { current } = inputRef;
        setOpen(!open);
        (current !== null && !open) && current.focus();
    }

    return <div className={`d-flex flex-column ${className}`}>
        {label !== '' ? <Label>{label}</Label> : null}

        {
            isSearch ? <ContainerAutoComplete
                onClick={handleClick}
                className='position-relative'
            >
                <TextField
                    handleChange={search}
                    name='autocomplete'
                    value={currentValue}
                    edge='end'
                    icon={<Arrows currentValue={currentValue} isSearch={true} />}
                    classesContainerInput='radius'
                    autocomplete="off"
                    refInput={inputRef}
                    isError={isError}
                    isReadOnly={readonly}
                    id='closeSelect'
                />

                {
                    (open && !readonly) ? <ContainerOptions className='position-absolute text-center w-100'>
                        {
                            optionsLocal.length > 0 ? <>
                                {
                                    optionsLocal.map((v, index) => (
                                        <Option
                                            key={index}
                                            onClick={() => handleSelect(v)}
                                            isActive={v.label === currentValue}
                                            className='pointer'
                                        >{v.label}</Option>
                                    ))
                                }
                            </> : <Text
                                color='rgb(122, 134, 154);'
                            >Sin opciones</Text>
                        }
                    </ContainerOptions> : null
                }
            </ContainerAutoComplete>
            : <Container
                className={`p-1 pointer position-relative d-flex ${classNameSelect}`}
                onClick={handleClick}
                isError={isError}
            >
                <Arrows currentValue={currentValue} />

                {
                    (open && !readonly) ? <ContainerOptions className='position-absolute text-center w-100'>
                        {
                            optionsLocal.map((v, index) => (
                                <Option
                                    key={index}
                                    onClick={() => handleSelect(v)}
                                    isActive={v.label === currentValue}
                                >{v.label}</Option>
                            ))
                        }
                    </ContainerOptions> : null
                }
            </Container>
        }
    </div>;
}

export default Select;