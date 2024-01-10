import { useState } from 'react';
import instance from '../axios/axios';
import Cookies from 'js-cookie';

const SignUp = () => {
	const [name, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const signUp = async () => {
		try {
			const response = await instance.post('/users', {
				name: name,
				email: email,
				password: password,
			});
			Cookies.set('token', response.data.token);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<input
				type="text"
				placeholder="name"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="text"
				placeholder="email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signUp}>Sign Up</button>
		</div>
	);
};

export default SignUp;
