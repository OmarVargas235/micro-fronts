import { ChangeEvent } from 'react';

import { Label, Input, ContainerCheckbox } from './styled';

interface IProps {
    borderColor?: string | null;
    color?: string | null;
    id: string;
    name: string;
    value: string;
    children: string | string[];
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isAfter?: boolean;
    isBeetween?: boolean;
    classes?: string;
    isChecked?: boolean | null;
}

const Checkbox = ({ children, borderColor=null, color=null, id, name, value, handleChange, isAfter=false, isBeetween=false, classes="", isChecked=null }: IProps): JSX.Element => (
    <ContainerCheckbox className={classes}>
        {
            isChecked === null
            ? <Input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                colorInput={color}
                onChange={handleChange}
            />
            : <Input
                type="checkbox"
                id={id}
                name={name}
                value={value}
                colorInput={color}
                onChange={handleChange}
                checked={isChecked}
            />
        }

        <Label
            htmlFor={id}
            borderColor={borderColor}
            isAfter={isAfter}
            isBeetween={isBeetween}
        ><span>{children}</span></Label>
    </ContainerCheckbox>
);

export default Checkbox;