import './sass/app.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Route Pages
import SignUp from './Pages/signup';
import Login from './Pages/login';

// TODO: Browser Router and Routes

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
