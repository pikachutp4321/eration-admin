import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Message from './components/Message';
import Withdraw from './components/Withdraw';
import AddStock from './components/AddStock';
import Navbar from './components/Navbar';
import BACKGROUND from './assets/QT-ration-cards.jpg';
import AddUser from './components/AddUser';
function App() {
    return (<BrowserRouter>
			<Navbar />
			<div className='absolute -z-10'>
				<img src={BACKGROUND} alt='' className='full'/>
			</div>
			<Routes>
				<Route path='/' element={<Home />}/>
				<Route path='/add-stock' element={<AddStock />}/>
				<Route path='/add-user' element={<AddUser />}/>
				<Route path='/message' element={<Message />}/>
				<Route path='/withdraw' element={<Withdraw />}/>
				<Route path='/login' element={<Login />}/>
			</Routes>
		</BrowserRouter>);
}
export default App;
