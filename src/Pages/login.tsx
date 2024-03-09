import { useState } from 'react';
import instance from '../axios/axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const login = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await instance.post('/users/login', {
				email: email,
				password: password,
			});

			const cookieOptions = rememberMe ? {} : { expires: 2 };
			Cookies.set('token', response.data.authToken, cookieOptions);

			if (response.status === 200) {
				navigate('/');
			}
		} catch (error) {
			setError('Failed to log in. Please check your email and password.');
			console.error(error);
		}
	};

	return (
		<div className="login">
			<div className="login_container">
				<h1>Login</h1>
				{error && <p className="error">{error}</p>}
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
					<div className="checkbox">
						<input
							type="checkbox"
							id="remember"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						/>{' '}
						<label className="checkbox-label" htmlFor="remember">
							Remember me?
						</label>
					</div>
				</form>
				<div className="no-account">
					<p>
						Don't have an account? <a href="/signup">Sign Up</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
