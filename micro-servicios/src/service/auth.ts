import axios from "axios";
import { User } from "../helpers/interface";

class Auth {

	public setSession = (ACCESS_TOKEN: string | null): void => {

		if (ACCESS_TOKEN !== null) {

			window.localStorage.setItem('jwt_access_token', ACCESS_TOKEN);
			axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`;

		} else {

			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	public signInWithToken = (): void => {

		this.setSession(this.getAccessToken());
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

	private readonly getAccessToken = (): string => {

		return window.localStorage.getItem('jwt_access_token') ?? '';
	};

	public logout = (): void => {

		this.setSession(null);
		this.setSessionUser(null);
	}
}

export const auth = new Auth();