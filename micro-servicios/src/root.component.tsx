// 1.- Librerias
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

// 2.- context
import GlobalProvider from './context/GlobalProvider';

// 3.- context
import { auth } from './service/auth';

// 4.- Componentes
import Alert from './layauts/alert/Alert';
import Spinner from './layauts/spinner/Spinner';

// 5.- theme
import { theme } from "./theme/theme";

const Navbar = lazy(async () => await import('./main/navbar/Navbar'));
const ConfigUser = lazy(async () => await import('./main/config'));
const Home = lazy(async () => await import('./main/home'));
const Products = lazy(async () => await import('./main/products'));
const ProductDetail = lazy(async () => await import('./main/product-detail'));
const Customers = lazy(async () => await import('./main/customers'));
const CustomerDetail = lazy(async () => await import('./main/customer-detail'));
const MyOrders = lazy(async () => await import('./main/my-orders'));
const MyOrdersDetail = lazy(async () => await import('./main/my-orders-detail'));
const NewOrders = lazy(async () => await import('./main/new-orders'));
const NewOrdersDetail = lazy(async () => await import('./main/newOrders-detail'));
const OrderBox = lazy(async () => await import('./main/orderBox'));

const GlobalStyle = createGlobalStyle`
	body {
		padding-bottom: 40px;
	}
`;

export default function Root(): JSX.Element {

	useEffect(() => {

		auth.signInWithToken();

	}, []);
	
	return <Suspense fallback={<Spinner isLoading={true} />}>
		<GlobalProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle />

				<Alert />
				<Spinner />
				
				<Router>
					<Routes>
						<Route path='/home' element={<Home />} />
						<Route path='/productos' element={<Products />} />
						<Route path='/detalle-producto/:id' element={<ProductDetail />} />
						<Route path='/clientes' element={<Customers />} />
						<Route path='/detalle-cliente' element={<CustomerDetail />} />
						<Route path='/mis-pedidos' element={<MyOrders />} />
						<Route path='/detalle-mis-pedidos/:id' element={<MyOrdersDetail />} />
						<Route path='/nuevos-pedidos/:codigo' element={<NewOrders />} />
						<Route path='/detalles-producto/:id' element={<NewOrdersDetail />} />
						<Route path='/caja-pedidos/:codigo' element={<OrderBox />} />
						<Route path='/configuracion' element={<ConfigUser />} />
					</Routes>
					
					<Navbar />
				</Router>
			</ThemeProvider>
		</GlobalProvider>
	</Suspense>
}