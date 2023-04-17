// 1.- Librerias
import axios, { AxiosError, AxiosResponse } from 'axios';

// 2.- Interfaces
import { Response, ResponsePaginate, ResumeOrder, Schedule, ListOrders, DetailOrder } from './interfaces';

// 3.- Utils
import { generateError } from './utils';

const path: string = 'pedidos/v1/Pedidos';

interface Body {
    lista_producto: Array<{ codigo_articulo: string; cantidad: number; }>;
    codigo_cliente: string;
}

export interface BodyGetListOrders {
	numpedido?: string;
	nombre_cliente?: string;
	estado?: string;
	rowsPerPage: number;
	page: number;
}

export interface BodyRegister {
	lista_producto: Array<{ codigo_articulo: string; cantidad: number; }>;
	codigo_cliente: string;
	id_borrador: string;
	direccion_cliente: string;
	condicion: string;
	fecha_entrega: string;
	observacion: string;
	horario_atencion: string;
	tipo_pago: string;
	tipo_usuario: string;
	latitud: number;
	longitud: number;
}

interface BodyGenerateDraft {
	lista_producto: Array<{ codigo_articulo: string; cantidad: number; }>;
	codigo_cliente: string;
	id_borrador?: string;
}

export interface Lista {
	cantidad: number;
	codigo_articulo: string;
	id_articulo: number;
	igv: boolean;
	medida_articulo: string;
	nombre_articulo: string;
	porcentaje_descuento: number;
	precio_bruto: number;
	precio_descontado_unidad: number;
	precio_descuento: number;
	precio_descuento_cliente: number;
	precio_descuento_producto: number;
	precio_igv: number;
	precio_neto: number;
	precio_venta_unidad: number;
	presentacion_articulo: string;
	stock: number;
	stock_obs_code: number;
	stock_observación: string;
	unidad_articulo: number;
}

interface ListaBonificacion extends Lista {
	cantidad_ofrecida: number;
	monto_venta: number;
	nombre_bonificacion: string;
}

interface ListaPromocion extends Lista {
	cantidad_compra: number;
	cantidad_premio: number;
	cantidad_premio_final: number;
	cantidadxpremio: number;
	codigo_articulo_para_promo:string;
	codigo_promo: string;
	nombre_promo: string;	
}

export type TResumeOrder = ResumeOrder<ListaBonificacion, Lista, ListaPromocion>;

type StateRegister = 'AP' | 'PE' | 'RE' | 'BR';

export interface Register {
	estado_pedido: StateRegister;
	observacion: string;
	lista:Array<{
		lista_bonificacion: ListaBonificacion[];
		lista_producto: Lista[];
		lista_promocion: ListaPromocion[]
		precio_bruto: number;
		precio_descuento: number;
		precio_igv: number;
		precio_neto: number;
	}>;
}

interface GenerateDraftResp {
	estado_pedido: "BR";
	lista: string;
	observacion: string;
}

class Orders {

    public resumeOrder = async (body: Body): Promise<Response<TResumeOrder | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/MostrarResumen`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<ResumeOrder<ListaBonificacion, Lista, ListaPromocion> | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve(error);
				});
		});
	};

	public register = async (body: BodyRegister): Promise<Response<Register | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/Registrar`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp.data as Response<Register | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};

	public generateDraft = async (body: BodyGenerateDraft): Promise<Response<GenerateDraftResp | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/GenerarBorrador`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp.data as Response<GenerateDraftResp | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};

	public getSchedule = async (): Promise<Response<Schedule[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/listarhorarios`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<Schedule[] | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);

					resolve(error);
				});
		});
	};

	public getListOrders = async (body: BodyGetListOrders): Promise<ResponsePaginate<ListOrders[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.post(`${path}/listarPedidos`, body)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message, total } = resp as ResponsePaginate<ListOrders[] | null>;

					if (status !== 200) throw Error("");

					resolve({ data, message, status, total });
				})
				.catch(({ response }: AxiosError) => {

					const error = response !== undefined ? generateError(response) : generateError(null);
					resolve({...error, total: 0});
				});
		});
	};

	public getDetailOrder = async (id: number): Promise<Response<DetailOrder[] | null>> => {

		return await new Promise((resolve) => {
			axios
				.get(`${path}/listarPedidosDetalle/${id}`)
				.then(({ data:resp }: AxiosResponse) => {

					const { status, data, message } = resp as Response<DetailOrder[] | null>;
					
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

export const orders = new Orders();