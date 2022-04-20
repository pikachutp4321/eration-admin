import React from 'react';
import Button from './Button';
import Input from './Input';
import Axios from '../controller/axios';
import { useNavigate } from 'react-router-dom';
const AddStock = () => {
    const navigate = useNavigate();
    const [rice, setRice] = React.useState('');
    const [wheat, setWheat] = React.useState('');
    const handleSubmit = async () => {
        if (!rice || !wheat || Number(rice) <= 0 || Number(wheat) <= 0) {
            alert('Quantity cannot less than or equal to 0!');
            return;
        }
        try {
            const obj = {
                rice,
                wheat,
            };
            await Axios.post('/add-stock', { quantity: obj });
            alert('Successful');
            navigate('/');
        }
        catch (e) {
            alert(e.response ? e.response.data : 'Cannot add quantity to stock!');
        }
    };
    return (<div className='full flex flex-col items-center justify-center'>
			<div className='bg-white  w-[350px] padding-element rounded-md'>
				<div>
					<span>Enter Rice Quantity (in KGS) </span>
					<Input className='w-full px-1 py-0.5' value={rice} handleChange={setRice} type='number'/>
				</div>
				<div>
					<span>Enter Wheat Quantity (in KGS) </span>
					<Input className='w-full px-1 py-0.5' value={wheat} handleChange={setWheat} type='number'/>
				</div>

				<div className='w-full flex justify-center'>
					<Button className='w-36 mt-4' onClick={handleSubmit} placeholder='Add'/>
				</div>
			</div>
		</div>);
};
export default AddStock;
