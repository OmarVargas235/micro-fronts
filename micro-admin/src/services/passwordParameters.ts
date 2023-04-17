// 1.- Librerias
import axios, { AxiosError, AxiosResponse } from 'axios';

// 2.- Interfaces
import { Response } from './interfaces';
import { SecurityParameters } from '../helpers/interface';

// 3.- Utils
import { generateError } from './utils';

const path: string = 'seguridad/v1';

class PasswordParameters {

    public getParameters = async (): Promise<Response<SecurityParameters[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/SeguridadParametros`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public changeParameters = async (body: Array<{ id: number; value: string; }>): Promise<Response<null>> => {

		return await new Promise((resolve) => {
			axios
				.put(`${path}/SeguridadParametros/actualizar`, { reglas: body })
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp;

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

export const passwordParameters = new PasswordParameters();