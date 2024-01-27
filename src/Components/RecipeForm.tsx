import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../axios/axios';

// TODO:
// 1. Remove ingredient row.
// 2. Add ingredients set two - This is for if there is a Brine, or a Sauce, or something outside of the main dish
// 3. Add more ingredients to set two
// 4. Style form - Mostly Finished
// 5. Maybe make instructions a wysiwyg

interface Recipe {
	title: string;
	description: string;
	ingredients: string[];
	ingredientsSetTwo?: string[];
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
		IngredientsSetTwo: [''],
		instructions: '',
		category: '',
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
			<form className="recipe_form" onSubmit={handleSubmit}>
				<div className="recipe_form__main">
					<input
						type="text"
						placeholder="Title"
						name="title"
						onChange={handleChange}
					/>
					<textarea
						placeholder="Instructions"
						name="instructions"
						onChange={handleChange}
					/>
					<textarea
						placeholder="Notes"
						name="notes"
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="Categories seperated by commas"
						name="category"
						onChange={handleChange}
					/>
					<button type="submit">Save</button>
				</div>
				<div className="recipe_form__ingredients">
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
				</div>
			</form>
		</>
	);
};

export default RecipeForm;
