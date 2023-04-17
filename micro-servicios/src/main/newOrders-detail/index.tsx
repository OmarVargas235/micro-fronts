import NewOrdersDetailPage from './container/NewOrdersDetail';
import NewOrdersDetailProvider from './NewOrdersDetailProvider';

const NewOrdersDetail = (): JSX.Element => {
	
	return <NewOrdersDetailProvider>
		<NewOrdersDetailPage />
	</NewOrdersDetailProvider>
};

export default NewOrdersDetail;