import { useState } from 'react';
import instance from '../axios/axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const [name, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const signUp = async () => {
		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		try {
			const response = await instance.post('/users', {
				name: name,
				email: email,
				password: password,
			});
			Cookies.set('token', response.data.token);
			if (response.status === 201) {
				navigate('/');
			}
		} catch (error) {
			setError('Failed to sign up. Please check your input.');
			console.error(error);
		}
	};

	return (
		<div className="signup-wrapper">
			<div className="signup">
				<div className="signup_container">
					<h1>Sign Up</h1>
					{error && <p className="error">{error}</p>}
					<input
						type="text"
						placeholder="Name"
						onChange={(e) => setUsername(e.target.value)}
					/>
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
					<input
						type="password"
						placeholder="Confirm Password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button onClick={signUp}>Sign Up</button>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
