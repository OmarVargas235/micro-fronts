// 1.- Librerias
import axios, { AxiosError, AxiosResponse } from 'axios';

// 2.- interfaces
import { Response, GetCustomer, GetCustomerBody, Direction } from './interfaces';
import { User } from '../helpers/interface';

// 3.- utils
import { generateError } from './utils';
import { defaultuser } from '../helpers/utils';

const path: string = 'clientes/v1/Clientes';

const user: User = JSON.parse(window.localStorage.getItem('user') ?? defaultuser);

class Customer {

    public getCustomer = async (body: GetCustomerBody): Promise<Response<GetCustomer | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/obtener`, { ...body, codigo_usuario: user.idUsuario })
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<GetCustomer | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};

	public getAddress = async (codeClient: string): Promise<Response<Direction[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/${codeClient}/obtenerdireccion`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<Direction[] | null>;

					if (status !== 200) throw Error("");
					
					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};
}

export const customer = new Customer();