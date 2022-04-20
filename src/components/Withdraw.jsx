import React from 'react';
import Button from './Button';
import Input from './Input';
import Axios from '../controller/axios';
const Withdraw = () => {
	const [aadhaar, setAadhaar] = React.useState('');
	const [rice, setRice] = React.useState('');
	const [wheat, setWheat] = React.useState('');
	const handleWithdraw = async () => {
		if (!aadhaar) {
			alert('Please enter aadhaar number');
			return;
		} else if (!rice && !wheat) {
			alert('Please enter billed quantity');
			return;
		}
		try {
			const obj = {
				rice,
				wheat,
			};
			await Axios.post('/withdraw', { aadhaar, quantity: obj });
			setAadhaar('');
			setRice('');
			setWheat('');
			alert('Successful');
		} catch (err) {
			alert(err.response ? err.response.data : 'Cannot withdraw on this aadhaar number');
		}
	};
	return (
		<div className='full flex flex-col items-center justify-center'>
			<div className='bg-white  w-[350px] padding-element rounded-md'>
				<div>
					<span>Aadhaar</span>
					<Input
						className='w-full px-1 py-0.5'
						value={aadhaar}
						handleChange={setAadhaar}
						type='number'
					/>
				</div>
				<div className='mt-2'>
					<span>Wheat (in kgs)</span>
					<Input
						className='w-full px-1 py-0.5'
						value={wheat}
						handleChange={setWheat}
						type='number'
					/>
				</div>
				<div>
					<span>Rice (in kgs)</span>
					<Input className='w-full px-1 py-0.5' value={rice} handleChange={setRice} type='number' />
				</div>
				<div className='w-full flex justify-center'>
					<Button className='w-36 mt-4' onClick={handleWithdraw} placeholder='Withdraw' />
				</div>
			</div>
		</div>
	);
};
export default Withdraw;
