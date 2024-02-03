import { useState } from 'react';
import instance from '../axios/axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const login = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await instance.post('/users/login', {
				email: email,
				password: password,
			});
			Cookies.set('token', response.data.authToken);
			if (response.status === 200) {
				navigate('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="login">
			<div className="login_container">
				<h1>Login</h1>
				<form className="login-form" onSubmit={login}>
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
				</form>
			</div>
		</div>
	);
};

export default Login;
