// 1.- Librerias
import axios, { AxiosError, AxiosResponse } from 'axios';

// 2.- Interfaces
import { Response, ResponsePaginate, DeatilProduct, Product } from './interfaces';

// 3.- Utils
import { generateError } from './utils';

const path: string = 'productos/v1/Producto';

export interface BodySearchProduct {
    search?: string;
    type?: string;
    rowsPerPage: number;
    page: number;
	cliente_codigo: string;
}

class Products {

    public getProduct = async (id: number, clienteCodigo: string): Promise<Response<DeatilProduct | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/Obtener/${id}/${clienteCodigo}`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<DeatilProduct | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};

    public searchProduct = async (body: BodySearchProduct): Promise<ResponsePaginate<Product[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/Bandeja`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message, total } = resp as ResponsePaginate<Product[] | null>;

					if (status !== 200) throw Error("");
					
					resolve({ data, message, status, total });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve({...error, total: 0});
				});
		});
	};
}

export const products = new Products();