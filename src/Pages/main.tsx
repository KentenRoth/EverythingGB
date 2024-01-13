import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link to="/create"> Create Recipe </Link>
		</div>
	);
};

export default Main;
