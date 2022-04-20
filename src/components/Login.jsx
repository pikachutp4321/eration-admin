import React from 'react';
import Navbar from './Navbar';
import BACKGROUND from '../assets/QT-ration-cards.jpg';
import Input from './Input';
import Button from './Button';
import Axios from '../controller/axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [details, setDetails] = React.useState({
        id: '',
        password: '',
    });
    React.useEffect(() => {
        localStorage.removeItem('token');
    }, []);
    const handleSubmit = async () => {
        try {
            const { data } = await Axios.post('/auth/login-admin', details);
            localStorage.setItem('token', data);
            navigate(`/`);
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Unable to log in...Please try again.');
        }
    };
    const handleChange = (key, value) => {
        setDetails((prev) => {
            return { ...prev, [key]: value };
        });
    };
    return (<div>
			<Navbar />
			<div className='absolute -z-10'>
				<img src={BACKGROUND} alt='' className='full'/>
			</div>
			<div className='full flex justify-center items-center'>
				<div className='bg-zinc-150 rounded-md padding-element flex flex-col'>
					<p className='text-black font-semibold text-lg text-center'>Login</p>
					<Input value={details.id} handleChange={(text) => handleChange('id', text)} placeholder='Username' type={'text'} className={'mt-4'}/>
					<Input value={details.password} handleChange={(text) => handleChange('password', text)} placeholder='Password' type={'password'} className={'mt-2'}/>
					<Button placeholder={'Continue'} className={`mt-4`} onClick={handleSubmit}/>
				</div>
			</div>
		</div>);
}
export default Login;
