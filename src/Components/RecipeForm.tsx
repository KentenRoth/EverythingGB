import React, { useState } from 'react';
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
		ingredientsSetTwo: [''],
		instructions: '',
		category: '',
		notes: '',
	});
	let [hasIngredientsSetTwo, setHasIngredientsSetTwo] = useState(false);

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

	const removeIngredient = (index: number) => {
		const newIngredients = [...recipe.ingredients];
		newIngredients.splice(index, 1);
		setRecipe({ ...recipe, ingredients: newIngredients });
	};

	const addIngredientsSetTwo = () => {
		setRecipe((prevRecipe) => ({
			...prevRecipe,
			ingredientsSetTwo: [''],
		}));
		if (hasIngredientsSetTwo === true) {
			setRecipe((prevRecipe) => ({
				...prevRecipe,
				ingredientsSetTwo: [''],
			}));
		}
		setHasIngredientsSetTwo(!hasIngredientsSetTwo);
	};

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
						<React.Fragment key={index}>
							<div className="ingredient_wrapper">
								<input
									type="text"
									placeholder={`Ingredient ${index + 1}`}
									name={`ingredient${index}`}
									value={ingredient || ''}
									onChange={(event) =>
										handleIngredientChange(index, event)
									}
								/>{' '}
								<button
									className="ingredients_delete"
									onClick={() => removeIngredient(index)}
								>
									{' '}
									-{' '}
								</button>
							</div>
						</React.Fragment>
					))}
					<div className="button_wrapper">
						<button type="button" onClick={addMoreIngredients}>
							Add More Ingredients
						</button>
						{!hasIngredientsSetTwo && (
							<button
								type="button"
								onClick={addIngredientsSetTwo}
							>
								Add Second Ingredient Set
							</button>
						)}
					</div>
					{hasIngredientsSetTwo && (
						<div className="recipe_form__ingredients-two">
							<h3>Ingredient Set Two</h3>
							{recipe.ingredientsSetTwo?.map(
								(ingredient, index) => (
									<React.Fragment key={index}>
										<input
											type="text"
											placeholder={`Ingredient ${
												index + 1
											}`}
											name={`ingredient${index}`}
											value={ingredient || ''}
											onChange={
												handleIngredientChangeSetTwo
											}
										/>
									</React.Fragment>
								)
							)}
							<div className="button_wrapper">
								<button
									type="button"
									onClick={addMoreIngredientsSetTwo}
								>
									Add More Ingredients
								</button>
								<button
									type="button"
									onClick={addIngredientsSetTwo}
								>
									Remove Ingredient Set Two
								</button>
							</div>
						</div>
					)}
				</div>
			</form>
		</>
	);
};

export default RecipeForm;
