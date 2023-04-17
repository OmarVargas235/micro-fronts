// 1.- Librerias
import axios, { AxiosError, AxiosResponse } from 'axios';

// 2.- Interfaces
import { Response, UserEdit } from './interfaces';
import { DataUserTable, UserSelect } from '../helpers/interface';

// 3.- Utils
import { generateError } from './utils';

const path: string = 'seguridad/v1/Usuarios';

class Users {

    public getUsers = async (): Promise<Response<DataUserTable[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/obtener`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<DataUserTable[]>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public getDocuments = async (): Promise<Response<UserSelect[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/documentoidentidad/obtener`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<UserSelect[]>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public getCargos = async (): Promise<Response<UserSelect[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/cargos/obtener`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<UserSelect[]>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public deleteUser = async (idUser: number): Promise<Response<UserSelect[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.delete(`${path}/${idUser}/eliminar`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<UserSelect[]>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public editUser = async (body: UserEdit): Promise<Response<{ ok: true; } | null>> => {

		return await new Promise((resolve) => {
			axios
				.put(`${path}/actualizar`, body)
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

export const users = new Users();