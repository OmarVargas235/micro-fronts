// 1.- librerias
import { useState, useEffect } from 'react';

// 2.- components
import Button from '../button/Button';
import { Text } from '../Text';
import Select, { IOption } from '../select/Select';

// 3.- estilos
import { BoxNumberPaginate } from '../table/styled';
import { Container } from './styled';

interface Props {
    total: number;
    rowsPerPage: (v: number) => void;
    page: (v: number) => void;
}

enum ValuesDefault {
    init = 1,
    end = 10
}

const nBox = 5;

const Paginate = ({ total, rowsPerPage, page }: Props): JSX.Element => {

    const [currentTotal, setCurrentTotal] = useState<number>(ValuesDefault.end);
    const [init, setInit] = useState<number>(ValuesDefault.init);
    const [end, setEnd] = useState<number>(ValuesDefault.end);
    const [currentPage, setCurrentPage] = useState<number>(ValuesDefault.init);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentIndex, setCurrentIdex] = useState<number>(ValuesDefault.init);
    const [indexBox, setIndexBox] = useState<number>(0);

    useEffect(() => {

        const totalPage = Math.ceil(total / currentTotal);
        setTotalPage(totalPage);
        setCurrentIdex(ValuesDefault.init);
        setCurrentPage(ValuesDefault.init);
        setIndexBox(0);

    }, [currentTotal, total]);

    const step = (n: number, index: number): void => {

        const nInit = currentTotal * n - currentTotal;
        const nEnd = currentTotal * n;

        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(n);
        setIndexBox(index);

        index === 0 && setIndexBox(index+1);
        index === (nBox-1) && setIndexBox(index-1);

        index === (nBox-1) && n < totalPage && setCurrentIdex(currentIndex+1);
        (index === 0 && currentIndex-1 > 0) && n < totalPage && setCurrentIdex(currentIndex-1);

        page(n);
    }

    const handleSelect = (e: IOption): void => {

        setCurrentTotal(Number(e.value));
        setEnd(Number(e.value));
        setCurrentIdex(1);
        setIndexBox(0);
        
        setCurrentPage(ValuesDefault.init);
        setInit(ValuesDefault.init);

        rowsPerPage(Number(e.value));
    }

    const prev = (): void => {

        const prev = currentPage-1;
        const nInit = init - 1 - currentTotal;
        const nEnd = end- currentTotal;
        
        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(prev);

        const index = indexBox-1 <= 0 ? 1 : indexBox-1;

        (indexBox-1 === 0 && prev > 1) && setCurrentIdex(currentIndex-1);

        prev === 1
        ? setIndexBox(0)
        : setIndexBox(index === 1 ? 1 : state => state-1);

        page(prev);
    }

    const next = (): void => {
        
        const next = currentPage+1;
        const nInit = currentPage * currentTotal;
        const nEnd = next * currentTotal;
        
        setInit(nInit+1);
        setEnd(nEnd);
        setCurrentPage(next);

        const index = indexBox+1 >= nBox-1 ? 3 : indexBox+1;

        (indexBox+1) === (nBox-1) && next < totalPage && setCurrentIdex(currentIndex+1);

        next === totalPage
            ? setIndexBox(4)
            : setIndexBox(index === 3 ? 3 : state => state+1);

        page(next);
    }

    return <Container className='row w-100 d-flex justify-content-center'>
        <div className='col-3 col-lg-1 px-0'>
            <Select
                options={[
                    { label: '10', value: 10 },
                    { label: '30', value: 30 },
                    { label: '50', value: 50 },
                    { label: '100', value: 100 },
                ]}
                handleChange={handleSelect}
                className='mr-1'
            />
        </div>
        
        <div className='col-9 col-md-3 col-lg-4 d-flex align-items-center'>
            {
                total === 0 ? <Text
                    size='14px'
                >Total de {total} registros</Text>
                : <Text
                    size='14px'
                >Mostrando registros del {init} al {currentPage === totalPage ? total : end} de un total de {total} registros</Text>
            }
        </div>
        
        <div className='col-12 col-md-6 col-lg-5 mt-4 mx-0 px-0'>
            <div className='d-flex justify-content-center align-items-center'>
                <Button
                    color='#1987FB'
                    classes='btn'
                    handleClick={prev}
                    disabled={currentPage === ValuesDefault.init || total === 0}
                >Anterior</Button>

                <div className='d-flex mx-1'>
                    {
                        new Array(totalPage).fill(1).slice(0, 5).map((v, index) => (
                            <BoxNumberPaginate
                                key={index}
                                onClick={() => step(index+currentIndex, index)}
                                isCurrent={currentPage === index+currentIndex}
                            >{index+currentIndex}</BoxNumberPaginate>
                        ))
                    }

                    {
                        (currentIndex === totalPage+1-nBox || totalPage <= nBox) ? null
                        : <BoxNumberPaginate
                            isCurrent={false}
                        >...</BoxNumberPaginate>
                    }

                </div>

                <Button
                    color='#1987FB'
                    classes='btn'
                    handleClick={next}
                    disabled={currentPage === totalPage || total === 0}
                >Siguiente</Button>
            </div>
        </div>
    </Container>
}

export default Paginate;