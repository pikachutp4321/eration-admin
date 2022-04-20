import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../controller/axios';
const Home = () => {
    const navigate = useNavigate();
    const [stock, setStock] = React.useState([]);
    const fetchDetails = React.useCallback(async () => {
        try {
            const { data } = await Axios.get('/stock');
            setStock(data);
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Unable to fetch current stock');
        }
    }, []);
    React.useEffect(() => {
        fetchDetails();
    }, [fetchDetails, navigate]);
    return (<div className='full flex flex-col items-center justify-center'>
			<div className='w-[300px] text-center text-lg font-medium bg-white rounded-md py-3'>
				{stock.map((item, index) => (<div key={index}>
						<p className='text-black/80 font-medium'>
							{item.name} : {item.qty}
						</p>
					</div>))}
			</div>
			<Link to='/message' className='w-[300px] text-center mt-2 text-lg font-medium bg-white rounded-md py-3'>
				Send Message
			</Link>
			<Link to='/withdraw' className='w-[300px] text-center mt-2 text-lg font-medium bg-white rounded-md py-3'>
				Withdraw
			</Link>
			<Link to='/add-stock' className='w-[300px] text-center mt-2 text-lg font-medium bg-white rounded-md py-3'>
				Add Stock
			</Link>
			<Link to='/add-user' className='w-[300px] text-center mt-2 text-lg font-medium bg-white rounded-md py-3'>
				Add / Modify User
			</Link>
		</div>);
};
export default Home;
