// 1.- Librerias
import { useState, useEffect, ChangeEvent } from 'react';

// 2.- components
import TextField from '../textField/TextField';
import Button from '../button/Button';
import Select, { IOption } from '../select/Select';
import { Text } from '../Text';

// 3.- Estilos
import { Container, Thead, Th, TBody, Tr, Td, BoxNumberPaginate } from './styled';

// 4.- iconos
import { AiOutlineSearch } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";

export type DataBody = Array<Array<string | number | JSX.Element>>;

interface Props {
    thead: string[];
    tbody: DataBody;
    width: string;
    alignHead?: 'left' | 'center' | 'right';
    alignBody?: 'left' | 'center' | 'right';
    refresh: () => void;
    addUser: () => void;
    isNewUser?: boolean;
}

enum ValuesDefault {
    init = 1,
    end = 10
}

const Table = ({ thead, tbody, width, alignHead='center', alignBody='center', refresh, addUser, isNewUser=false }: Props): JSX.Element => {

    const [currentTotal, setCurrentTotal] = useState<number>(ValuesDefault.end);
    const [init, setInit] = useState<number>(ValuesDefault.init);
    const [end, setEnd] = useState<number>(ValuesDefault.end);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(ValuesDefault.init);
    const [dataBody, setDataBody] = useState<DataBody>([]);
    const [search, setSeacrh] = useState<string>('');

    useEffect(() => {

        const totalPage = Math.ceil(dataBody.length / currentTotal);
        setTotalPage(totalPage);

    }, [currentTotal, dataBody]);

    useEffect(() => setDataBody(tbody), [tbody]);

    const step = (n: number): void => {

        const nInit = currentTotal * n - currentTotal;
        const nEnd = currentTotal * n;

        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(n);
    }

    const prev = (): void => {

        const prev = currentPage-1;
        const nInit = init - 1 - currentTotal;
        const nEnd = end- currentTotal;
        
        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(prev);
    }

    const next = (): void => {

        const next = currentPage+1;
        const nInit = currentPage * currentTotal;
        const nEnd = next * currentTotal;

        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(next);
    }

    const handleSelect = (e: IOption): void => {

        setCurrentTotal(Number(e.value));
        setEnd(Number(e.value));
        
        setCurrentPage(ValuesDefault.init);
        setInit(ValuesDefault.init);
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {

        const text: string = e.target.value.toLowerCase().trim();
        const filter = tbody.filter(arr => {

            const copyArr: Array<string | JSX.Element> = JSON.parse(JSON.stringify(arr));
            copyArr.pop();

            return copyArr.filter(v => typeof v === 'object'
                ? v.props.elements[0].name.toLowerCase().trim().includes(text)
                : v.toLowerCase().trim().includes(text)
            ).length > 0;
        });

        setSeacrh(text);
        setDataBody(filter);
        setInit(1);
        setEnd(currentTotal);
    }

    return <Container className='p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
            <TextField
                handleChange={handleSearch}
                name='search'
                value={search}
                icon={<AiOutlineSearch size={25} />}
                edge="start"
                classesContainerInput='border-radius'
            />

            <div className='d-flex'>
                {
                    isNewUser
                    ? <Button classes='mr-2' color='#1987FB' handleClick={() => addUser()}>Nuevo usuario</Button>
                    : null
                }

                <Button
                    color='#1987FB'
                    handleClick={() => refresh()}
                    edge='end'
                    icon={<BiRefresh size={18} />}
                >Refrescar</Button>
            </div>
        </div>

        <div className='container-table'>
            <Thead
                columns={thead.length}
                align={alignHead}
                widthGrid={width}
            >
                {
                    thead.map((v, index) => (
                        <Th
                            key={index}
                            className='p-2'
                            isFirst={index === 0}
                            isLast={index === thead.length -1}
                        >{v}</Th>
                    ))
                }
            </Thead>

            <TBody>
                {
                    dataBody.slice(init-1, end).map(((row, index) => (
                        <Tr
                            key={index}
                            className='p-2'
                            columns={row.length}
                            align={alignBody}
                            widthGrid={width}
                        >
                            {
                                row.map((v, index) => (
                                    <Td key={index}>{v}</Td>
                                ))
                            }
                        </Tr>
                    )))
                }
            </TBody>
        </div>

        <div className='d-flex align-items-start justify-content-between mt-4'>
            <Select
                options={[
                    { label: '10', value: 10 },
                    { label: '25', value: 25 },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 },
                ]}
                handleChange={handleSelect}
                className='mr-1'
            />

            <Text
                size='14px'
            >Mostrando registros del {init} al {currentPage === totalPage ? dataBody.length : end} de un total de {dataBody.length} registros</Text>

            <div className='d-flex align-items-center'>
                <Button
                    color='#1987FB'
                    classes='btn-table'
                    handleClick={prev}
                    disabled={currentPage === ValuesDefault.init}
                >Anterior</Button>
                
                <div className='d-flex mx-1'>
                    {
                        new Array(totalPage).fill(1).map((v, index) => (
                            <BoxNumberPaginate
                                key={index}
                                onClick={() => step(index+1)}
                                isCurrent={(index+1)*currentTotal === end}
                            >{index+1}</BoxNumberPaginate>
                        ))
                    }
                </div>

                <Button
                    color='#1987FB'
                    classes='btn-table'
                    handleClick={next}
                    disabled={currentPage === totalPage}
                >Siguiente</Button>
            </div>
        </div>
    </Container>
}

export default Table;