# COMO USAR EL COMPONENTE

```sh
import Form from 'layauts/form/Form';
import TextField from 'layauts/textField/TextField';
import Button from 'layauts/button/Button';
import Select, { IOption } from 'layauts/select/Select';
import { useForm } from 'hooks/hookForm/useForm';
import Checkbox from 'layauts/checkbox/Checkbox';
 
interface Model {
    prop1: string;
    prop2: number;
    prop3: boolean;
}

const requeridFields = ['prop1', 'prop3'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleSubmit, handleChange, handleChangeTextarea, validateFields, errors, setSelect } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        prop1: '',
        prop2: -1,
        prop3: false,
    });

    const handleSelect = (value: number, name: string): void => {
    
        setSelect('prop', value, setForm, form);
        'or'
        setSelect(name, value, setForm, form);
    }

    const onSubmit = async (model: object): Promise<void> => {
    
        const newModel = model as Model;
        
        const isError: boolean = validateFields(newModel, [...requeridFields]);
        
        if (isError) return;
    
        // Si no hay errores, colocar el resto del codigo aqui.
    }
    
    return <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
    >
        <TextField
            label="label"
            name="name-input"
            handleChange={e => handleChange(e, setForm, form)}
            isError={errors.includes('name-input')}
            value={form.prop1}
        />
    
        <TextField
            type='textarea'
            label="Descripción"
            name="description"
            handleChange={()=>{}}
            handleChangeTextarea={e => handleChangeTextarea(e, setForm, form)}
            isError={errors.includes('description')}
            value={form.description}
            classesContainerInput='w-100'
        />
    
        <Checkbox
            id={id}
            name={name}
            value={value}
            handleChange={handleChange}
        >
            text
        </Checkbox>
    
        <Select
            label='Titulo'
            options={[{ label: 'hola mundo', id: 1 }]}
            handleChange={(v: IOption) => handleSelect(v.value, 'name-select')}
            value={form.id}
            isError={errors.includes('name-input')}
        />
    
        <Button type="submit">Volver</Button>
    </Form>;
}
```

## Props esquema

```sh
type Children = JSX.Element | JSX.Element[];
```

Props
-------

|  params      |        required          |    type    |
| ------------ | :----------------------: | :--------: |
| children     | :heavy_check_mark:       | `Children` |
| handleSubmit | :heavy_check_mark:       | `Function` |
| onSubmit     | :heavy_check_mark:       | `Function` |
| className    | :heavy_multiplication_x: | `string`   |