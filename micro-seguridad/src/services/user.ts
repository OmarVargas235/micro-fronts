import axios, { AxiosError, AxiosResponse } from 'axios';
import { Response, Register } from './interfaces';
import { generateError } from './utils';

const path = '/clientes/v1/Usuarios';

class User {

    public register = async (body: Register): Promise<Response<string | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/registrar`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<string>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};

    public changePassword = async (email: string): Promise<Response<{ ok: boolean } | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/RememberPassword`, {
					email
				})
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<{ ok: boolean }>;

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

export const user = new User();