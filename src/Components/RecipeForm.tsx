import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../axios/axios';

// TODO:
// 1. Add ingredients set two - This is for if there is a Brine, or a Sauce, or something outside of the main dish
// 2. Add more ingredients to set two
// 3. Style form

interface Recipe {
	title: string;
	description: string;
	ingredients: string[];
	instructions: string;
	category: string[];
	notes: string;
}

interface RecipeFormProps {
	recipe?: Recipe;
}
const RecipeForm: React.FC<RecipeFormProps> = () => {
	let [recipe, setRecipe] = useState({
		title: '',
		description: '',
		ingredients: [''],
		instructions: '',
		category: [''],
		notes: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
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

	const handleIngredientChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newIngredients = [...recipe.ingredients];
		newIngredients[index] = event.target.value;
		setRecipe({ ...recipe, ingredients: newIngredients });
	};

	const addMoreIngredients = () => {
		setRecipe((prevRecipe) => ({
			...prevRecipe,
			ingredients: [...prevRecipe.ingredients, ''],
		}));
	};

	const addIngredientsSetTwo = () => {};

	const handleIngredientChangeSetTwo = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {};

	const addMoreIngredientsSetTwo = () => {};

	return (
		<>
			<div className="recipe_form_container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="title"
						name="title"
						onChange={handleChange}
					/>
					{recipe.ingredients.map((ingredient, index) => (
						<>
							<input
								key={index}
								type="text"
								placeholder={`Ingredient ${index + 1}`}
								name={`ingredient${index}`}
								value={ingredient || ''}
								onChange={(event) =>
									handleIngredientChange(index, event)
								}
							/>
						</>
					))}
					<button type="button" onClick={addMoreIngredients}>
						Add More Ingredients
					</button>
					<input
						type="text"
						placeholder="instructions"
						name="instructions"
						onChange={handleChange}
					/>
					<textarea
						placeholder="Categories seperated by commas"
						name="category"
						onChange={handleChange}
					></textarea>
					<textarea
						placeholder="notes"
						name="notes"
						onChange={handleChange}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</>
	);
};

export default RecipeForm;
