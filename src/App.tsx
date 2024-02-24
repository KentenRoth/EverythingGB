import './sass/app.sass';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import instance from './axios/axios';

// Route Pages
import SignUp from './Pages/signup';
import Login from './Pages/login';
import Main from './Pages/main';

// TODO: Browser Router and Routes

const AuthCheck = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const isTokenValid = async () => {
			try {
				await instance.get('/users/me').then((response) => {
					if (response.status === 200) {
						setIsLoggedIn(true);
					}
				});
			} catch (error) {
				navigate('/login');
			}
		};

		isTokenValid();
	}, [navigate]);

	return isLoggedIn ? <Main /> : <Login />;
};

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthCheck />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
