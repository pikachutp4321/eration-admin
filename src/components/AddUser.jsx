import React from 'react';
import Button from './Button';
import Input from './Input';
import Axios from '../controller/axios';
import { useNavigate } from 'react-router-dom';
import SEARCH from '../assets/magnifier.png';
import DELETE from '../assets/delete.png';
import $ from 'jquery';
const AddUser = () => {
    const navigate = useNavigate();
    const [details, setDetails] = React.useState({
        name: '',
        phone: '',
        email: '',
        aadhaar: '',
        address: '',
        state: '',
        district: '',
        members: [],
        membersCount: 0,
    });
    const handleChange = (name, value) => {
        setDetails((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
    const elRefs = React.useRef([]);
    if (elRefs.current.length !== details.membersCount) {
        // add or remove refs
        // add or remove refs=
        elRefs.current = Array(details.membersCount)
            .fill(null)
            .map((_, i) => elRefs.current[i] || React.createRef());
    }
    const handleClick = async () => {
        const members = [];
        for (let i = 0; i < details.membersCount; i++) {
            const func = elRefs.current[i];
            members.push(func.current());
        }
        try {
            await Axios.post('/auth/signup-user', { ...details, members });
            alert('Successful');
            navigate('/');
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Some error occurred. Try again.');
        }
    };
    const searchAadhaar = async (e) => {
        if (!details.aadhaar) {
            alert('Please enter aadhaar number');
            return;
        }
        try {
            const { data } = await Axios.get('/details/' + details.aadhaar);
            $(e.target).hide();
            setDetails(data);
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Some error occurred. Try again.');
        }
    };
    const deleteAadhaar = async (e) => {
        if (!details.aadhaar) {
            alert('Please enter aadhaar number');
            return;
        }
        try {
            await Axios.get('/delete/' + details.aadhaar);
            alert('Successful');
            navigate('/');
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Some error occurred. Try again.');
        }
    };
    return (<>
			<div className='full flex  justify-center items-center'>
				<div className='bg-zinc-150 w-[400px] rounded-md padding-element flex flex-col  mt-2'>
					<p className='text-black font-semibold text-lg text-center'>Add User</p>

					<Input value={details.phone} handleChange={(text) => handleChange('phone', text)} placeholder='Phone' type={'text'} className={'mt-2'}/>
					<Input value={details.name} handleChange={(text) => handleChange('name', text)} placeholder='Name' type={'text'} className={'mt-2'}/>
					<Input value={details.email} handleChange={(text) => handleChange('email', text)} placeholder='Email' type={'email'} className={'mt-2'}/>
					<Input value={details.aadhaar} handleChange={(text) => handleChange('aadhaar', text)} placeholder='Aadhaar No' maxLength={12} type={'email'} className={'mt-2'}/>
					<Input value={details.state} handleChange={(text) => handleChange('state', text)} placeholder='State' type={'text'} className={'mt-2'}/>
					<Input value={details.district} handleChange={(text) => handleChange('district', text)} placeholder='District' type={'text'} className={'mt-2'}/>
					<Input value={details.address} handleChange={(text) => handleChange('address', text)} placeholder='Address' type={'text'} className={'mt-2'}/>
					<Input value={String(details.membersCount || '')} handleChange={(text) => handleChange('membersCount', Number(text))} placeholder='Count of family members' type={'number'} className={'mt-2'}/>

					<div className='w-full flex justify-center'>
						<img src={SEARCH} alt='Search' className='w-6 h-6 mt-6 mr-6 cursor-pointer' onClick={searchAadhaar}/>
						<Button className='w-36 mt-4' onClick={handleClick} placeholder='Add'/>
						<img src={DELETE} alt='Delete' className='w-6 h-6 mt-6 ml-6 cursor-pointer' onClick={deleteAadhaar}/>
					</div>
				</div>
				<div className='bg-zinc-150 w-[400px] rounded-md padding-element flex flex-col  ml-2'>
					<p className='text-black font-semibold text-lg text-center'>Member Details</p>
					{[...Array(details.membersCount)].map((ele, i) => {
            console.log(details.members);
            return (<MemberDetail key={i} member={details.members ? details.members[i] : {}} funcRef={elRefs.current[i]}/>);
        })}
				</div>
			</div>
		</>);
};
export default AddUser;
function MemberDetail({ funcRef, member, }) {
    const [name, setName] = React.useState(member?.name || '');
    const [aadhaar, setAadhaar] = React.useState(member?.aadhaar || '');
    const getData = React.useCallback(() => {
        return {
            name,
            aadhaar,
        };
    }, [aadhaar, name]);
    React.useEffect(() => {
        funcRef.current = getData;
    }, [funcRef, getData]);
    return (<div className='flex flex-col'>
			<p className='text-black font-medium text-center'>Member Detail</p>
			<Input value={aadhaar} handleChange={setAadhaar} placeholder='Aadhaar' type={'text'} className={'mt-2'}/>
			<Input value={name} handleChange={setName} placeholder='Name' type={'text'} className={'mt-2'}/>
		</div>);
}
