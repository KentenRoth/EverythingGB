import './sass/app.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Route Pages
import SignUp from './Pages/signup';

// TODO: Browser Router and Routes

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
