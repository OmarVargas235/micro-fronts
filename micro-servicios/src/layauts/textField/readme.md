# COMO USAR EL COMPONENTE

## TextField basico

```sh
import TextField from 'layauts/textField/TextField';
import { useForm } from 'hooks/hookForm/useForm';
 
interface Model {
    prop1: string;
}

const requeridFields = ['prop1'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleChange } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        prop1: '',
    });
    
    return <TextField
        name="name"
        handleChange={e => handleChange(e, setForm, form)}
        value={form.prop1}
    />;
}
```

## TextField utilidades

```sh
import TextField from 'layauts/textField/TextField';
import { useForm } from 'hooks/hookForm/useForm';
 
interface Model {
    prop1: string;
}

const requeridFields = ['prop1'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleChange, errors } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        prop1: '',
    });
    
    return <TextField
        classes='class1'
        classesInput='classesInput1'
        classesContainerInput='classesContainerInput1'
        name="name"
        handleChange={e => handleChange(e, setForm, form)}
        value={form.prop1}
        placeholder='texto cualquiera'
        label='texto cualquiera'
        type='number'
        isReadOnly={true}
        isError={errors.includes('number-document')}
        isFull={true}
        autocomplete='on'
        refInput = { current: null }
        id={id}
    />;
}
```

## TextField manejo de error

```sh
import TextField from 'layauts/textField/TextField';
import { useForm } from 'hooks/hookForm/useForm';
 
interface Model {
    prop1: string;
}

const requeridFields = ['prop1'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleChange } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        prop1: '',
    });
    
    return <TextField
        name="name"
        handleChange={e => handleChange(e, setForm, form)}
        value={form.prop1}
        type='text'
        isError={true}
        helperText="Aqui va el mensaje de error"
        colorHelperText="red"
    />;
}
```

## TextField iconos a la izquierd, derecha y ambos lados

```sh
import TextField from 'layauts/textField/TextField';
import { useForm } from 'hooks/hookForm/useForm';
import { AiOutlineUser } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
 
interface Model {
    email: string;
    name: string;
    password: string;
}

const requeridFields = ['email', 'name', 'password'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleChange } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        email: '',
        name: '',
        password: '',
    });
    
    return <>
        <TextField
            name="email"
            handleChange={e => handleChange(e, setForm, form)}
            value={form.email}
            icon={<AiOutlineUser size={25} color='#090F47' />}
            edge="start"
        />

        <TextField
            name="name"
            handleChange={e => handleChange(e, setForm, form)}
            value={form.name}
            icon={<AiOutlineUser size={25} color='#090F47' />}
            edge="end"
        />

        <TextField
            name="password"
            handleChange={e => handleChange(e, setForm, form)}
            value={form.password}
            icon={<BsEye size={25} color='#090F47' />}
            edge="start"
            icon2={<BsEyeSlash size={25} color='#090F47' />}
            edge2="end"
        />
    </>;
}
```

## TextField textarea

```sh
import TextField from 'layauts/textField/TextField';
import { useForm } from 'hooks/hookForm/useForm';
 
interface Model {
    prop1: string;
}

const requeridFields = ['prop1'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleChangeTextarea } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        prop1: '',
    });
    
    return <TextField
        type='textarea' 
        name="name"
        handleChange={()=>{}}
        handleChangeTextarea={e => handleChangeTextarea(e, setForm, form)}
        value={form.prop1}
        maxLength={150}
    />;
}
```

## TextField helpers

```sh
import TextField from 'layauts/textField/TextField';
import { useForm } from 'hooks/hookForm/useForm';
 
interface Model {
    prop1: string;
}

const requeridFields = ['prop1'] as const;
type RequeridFields = typeof requeridFields[number];

const Component = (): JSX.Element => {

    const { handleChange } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        prop1: '',
    });
    
    return <TextField
        name="name"
        handleChange={handleChange}
        value={form.prop1}
        helperText="Hola Mundo"
        colorHelperText="red"
        weightHelperText="bold"
        sizeHelperText="20px"
    />;
}
```

## Props esquema

```sh
type Icon = JSX.Element | null;
type Edge = 'start' | 'end' | null;
type Value = string | number;
type Type = 'text' | 'number' | 'email' | 'password' | 'date' | 'textarea';
type Autocomplete = 'on' | 'off';
type RefInput = { current: HTMLInputElement | null };
```

Props
-------

|  params               |           required       |    type        |
| --------------------- | :----------------------: | :------------: |
| classes               | :heavy_multiplication_x: | `string`       |
| classesInput          | :heavy_multiplication_x: | `string`       |
| classesContainerInput | :heavy_multiplication_x: | `string`       |
| icon                  | :heavy_multiplication_x: | `Icon`         |
| icon2                 | :heavy_multiplication_x: | `Icon`         |
| edge                  | :heavy_multiplication_x: | `Edge`         |
| edge2                 | :heavy_multiplication_x: | `Edge`         |
| placeholder           | :heavy_multiplication_x: | `string`       |
| label                 | :heavy_multiplication_x: | `string`       |
| type                  | :heavy_multiplication_x: | `Type`         |
| name                  | :heavy_check_mark:       | `string`       |
| handleChange          | :heavy_check_mark:       | `Funtion`      |
| handleChangeTextarea  | :heavy_multiplication_x: | `Funtion`      |
| value                 | :heavy_check_mark:       | `Value`        |
| isReadOnly            | :heavy_multiplication_x: | `boolean`      |
| isError               | :heavy_multiplication_x: | `boolean`      |
| isFull                | :heavy_multiplication_x: | `boolean`      |
| helperText            | :heavy_multiplication_x: | `string`       |
| colorHelperText       | :heavy_multiplication_x: | `string`       |
| weightHelperText      | :heavy_multiplication_x: | `string`       |
| sizeHelperText        | :heavy_multiplication_x: | `string`       |
| autocomplete          | :heavy_multiplication_x: | `Autocomplete` |
| refInput              | :heavy_multiplication_x: | `RefInput`     |
| id                    | :heavy_multiplication_x: | `string`       |