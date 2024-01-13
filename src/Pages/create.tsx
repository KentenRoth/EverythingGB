import React, { useState } from 'react';
import instance from '../axios/axios';

const Create = () => {
	let [recipe, setRecipe] = useState({
		title: '',
		description: '',
		ingredients: '',
		instructions: '',
		category: '',
		notes: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipe({ ...recipe, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		instance
			.post('/recipes', recipe)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div>
				<h1>Create</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="title"
						name="title"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="description"
						name="description"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="ingredients"
						name="ingredients"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="instructions"
						name="instructions"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="category"
						name="category"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="notes"
						name="notes"
						onChange={handleChange}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</>
	);
};

export default Create;
