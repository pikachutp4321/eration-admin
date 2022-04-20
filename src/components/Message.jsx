import React from 'react';
import Button from './Button';
import Axios from '../controller/axios';
import { useNavigate } from 'react-router-dom';
const Message = () => {
    const navigate = useNavigate();
    const fetchDetails = React.useCallback(async () => {
        try {
            const { data } = await Axios.get('/users');
            setUsers(data);
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Unable to fetch details');
        }
    }, []);
    React.useEffect(() => {
        fetchDetails();
    }, [fetchDetails, navigate]);
    const [users, setUsers] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const updateSelection = (selectedUser, checked) => {
        setUsers((prev) => prev.map((user) => {
            if (user.phone === selectedUser.phone) {
                user.selected = checked;
            }
            return user;
        }));
    };
    const bulkSelectUser = (checked) => {
        setUsers((prev) => prev.map((user) => {
            user.selected = checked;
            return user;
        }));
    };
    const handleNotify = async () => {
        const selectedUsers = users.filter((user) => user.selected);
        if (selectedUsers.length <= 0) {
            alert('No Users Selected');
            return;
        }
        else if (!message) {
            alert('Message cannot be empty');
            return;
        }
        try {
            await Axios.post('/notify', { users: selectedUsers, message });
            alert('Message sent successfully');
            navigate('/');
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Unable to send message');
        }
    };
    return (<>
			<div className='h-fit flex flex-col items-center pt-16'>
				<div className='bg-zinc-150 rounded-md padding-element flex flex-col w-[100%]'>
					<div className='my-0.5 justify-center items-center flex border border-black'>
						<div className='w-[10%] text-center text-black font-medium text-base px-1'>
							<input type='checkbox' onChange={(e) => bulkSelectUser(e.target.checked)}/> Select
							All
						</div>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Name
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Phone
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Aadhaar
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Address
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							State
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							District
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Members Count
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Last Message
						</span>
						<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
							Quantity Allocated
						</span>
					</div>
					{users.map((user, index) => (<User key={index} user={user} updateSelection={updateSelection}/>))}
				</div>

				<div className='bg-zinc-150 rounded-md padding-element flex flex-col items-center mt-10 w-[70%]'>
					<textarea className='w-[100%] p-1 border border-zinc-50 resize-y rounded-md' placeholder='Enter your message here...' value={message} onChange={(e) => {
            setMessage(e.target.value);
        }}/>
					<Button className='w-36 mt-4' onClick={handleNotify} placeholder='Notify Selected'/>
				</div>
			</div>
		</>);
};
const User = ({ user, updateSelection, }) => {
    return (<div className='my-0.5 flex justify-center items-center border border-black'>
			<div className='w-[10%] text-center text-black font-medium text-base px-1'>
				<input type='checkbox' checked={user.selected} onChange={(e) => {
            updateSelection(user, e.target.checked);
        }}/>
			</div>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.name}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.phone}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.aadhaar}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.address}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.state}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.district}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.membersCount}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.lastMessage}
			</span>
			<span className='w-[10%] border-l border-black text-center text-black font-medium text-base px-1'>
				{user.allotedQuantity}
			</span>
		</div>);
};
export default Message;
