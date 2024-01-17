import { useState } from 'react';
import instance from '../axios/axios';
import Cookies from 'js-cookie';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		try {
			const response = await instance.post('/users/login', {
				email: email,
				password: password,
			});
			Cookies.set('token', response.data.authToken);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="login">
			<div className="login_container">
				<h1>Login</h1>
				<input
					type="text"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={login}>Login</button>
			</div>
		</div>
	);
};

export default Login;
