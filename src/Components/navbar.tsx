import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const NavBar = () => {
	return (
		<>
			<Nav />
			<div className="content">
				<Outlet />
			</div>
		</>
	);
};

export default NavBar;
