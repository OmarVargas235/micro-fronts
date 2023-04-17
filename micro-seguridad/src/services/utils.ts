import { AxiosResponse } from 'axios';
import { Response, Status } from './interfaces';

export const generateError = (resp: AxiosResponse | null): Response<null>  => {

    if (resp === null) {

        const error = new Error(JSON.stringify({ data: null, message: 'Ha ocurrido un problema', status: "" }));
        return JSON.parse(error.message);
    }

    const statusCode = resp.status as Status;

    if (statusCode === 401 || statusCode === 403) {

        const error = new Error(JSON.stringify({ data: null, message: 'Lo sentimos, la sesión ha expirado', status: 401 }));
        return JSON.parse(error.message);
    }

    if (statusCode === 404 || statusCode === 415) {

        const error = new Error(JSON.stringify({ data: null, message: 'Ha ocurrido un problema', status: 404 }));
        return JSON.parse(error.message);
    }

    if (statusCode === 500 || statusCode === 502 || statusCode === 504) {

        const error = new Error(JSON.stringify({ data: null, message: 'Ha ocurrido un problema en el servidor', status: 500 }));
        return JSON.parse(error.message);
    }

    const response = resp.data;

    const responseString = response as unknown as string;

    if (responseString === '' || 'detail' in response && response.status !== 400) {

        const error = new Error(JSON.stringify({ data: null, message: 'Ha ocurrido un problema en el servidor', status: 500 }));
        return JSON.parse(error.message);
    }

    const { data, message, status, messages } = response;
   
    const error = new Error(JSON.stringify({ data, message: message ?? messages, status: status ?? 500 }));

    return JSON.parse(error.message);
}