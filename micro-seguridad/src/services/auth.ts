import axios, { AxiosError, AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

import { Response } from './interfaces';
import { generateError } from './utils';
import { User } from '../helpers/interface';

interface IToken {
	email: string;
	exp: number;
	iat: number;
}

export type Event = 'onAutoLogin' | 'onAutoLogout' | 'onNoAccessToken' | '';

class Auth {
	private typeEvent: Event = '';

	public init = (): void => {
		this.handleAuthentication();
	};

	private readonly on = (event: Event): void => {
		this.typeEvent = event;
	};

	public getEvent = (): Event => {
		return this.typeEvent;
	};

	public signIn = async (email: string, password: string): Promise<Response<User>> => {

		return await new Promise((resolve, reject) => {
			axios
				.post('/seguridad/v1/Login', {
					email,
					password,
				})
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<User>;

					this.setSession(data === null ? null : data.token);
					this.setSessionUser(data === null ? null : data);

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					reject(error);
				});
		});
	};

	public setSession = (ACCESS_TOKEN: string | null): void => {

		if (ACCESS_TOKEN !== null) {

			window.localStorage.setItem('jwt_access_token', ACCESS_TOKEN);
			axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;

		} else {

			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	public setSessionUser = (DATA_USER: User | null): void => {

		if (DATA_USER !== null) {

			window.localStorage.setItem('user', JSON.stringify(DATA_USER));

		} else {

			localStorage.removeItem('user');
			localStorage.removeItem('detail-client');
			localStorage.removeItem('cart');
			localStorage.removeItem('detail-order');
			localStorage.removeItem('maxAttempts');
		}
	};

	public signInWithToken = (): void => {

		this.setSession(this.getAccessToken());
	};

	public getAccessToken = (): string => {

		return window.localStorage.getItem('jwt_access_token') ?? '';
	};

	public logout = (): void => {

		this.setSession(null);
		this.setSessionUser(null);
	}

	private readonly handleAuthentication = (): void => {

		const ACCESS_TOKEN = this.getAccessToken();

		if (ACCESS_TOKEN === '') {
			this.on('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(ACCESS_TOKEN)) {
			this.setSession(ACCESS_TOKEN);
			this.on('onAutoLogin');
		} else {
			this.setSession(null);
			this.on('onAutoLogout');
		}
	};

	public isAuthTokenValid = (ACCESS_TOKEN: string): boolean => {

		if (ACCESS_TOKEN === '') return false;

		const decoded: IToken = jwtDecode(ACCESS_TOKEN);

		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};
}

export const auth = new Auth();