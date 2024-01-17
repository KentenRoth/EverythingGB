import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<>
			<div className="nav">
				<div className="nav_container">
					<Link to="/">
						<h1>Recipe Book</h1>
					</Link>
					<div className="nav_links">
						<Link to="/create">
							<h3>Create</h3>
						</Link>
						<Link to="/login">
							<h3>Login</h3>
						</Link>
						<Link to="/signup">
							<h3>Sign Up</h3>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Nav;
