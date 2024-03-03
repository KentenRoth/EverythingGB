import React, { useState } from 'react';
import instance from '../axios/axios';
import Tiptap from './newEditor';

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
		instructions: '<p>Instructions</p>',
		category: '',
		notes: '',
	});
	let [hasIngredientsSetTwo, setHasIngredientsSetTwo] = useState(false);
	let [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRecipe({ ...recipe, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const filteredIngredients = recipe.ingredients.filter(
			(ingredient) => ingredient !== ''
		);
		const filteredIngredientsSetTwo = recipe.ingredientsSetTwo.filter(
			(ingredient) => ingredient !== ''
		);

		const newRecipe = {
			...recipe,
			ingredients: filteredIngredients,
			ingredientsSetTwo: filteredIngredientsSetTwo,
		};
		instance
			.post('/recipes', newRecipe)
			.then((response) => {
				if (response.status === 201) {
					setRecipe({
						title: '',
						description: '',
						ingredients: [''],
						ingredientsSetTwo: [''],
						instructions: '<p>Instructions</p>',
						category: '',
						notes: '',
					});
					setHasIngredientsSetTwo(false);
					setError(null);
				}
			})
			.catch((error) => {
				setError('An error occurred while saving the recipe.');
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

	const removeIngredientsSetTwo = (index: number) => {
		const newIngredients = [...recipe.ingredientsSetTwo];
		newIngredients.splice(index, 1);
		setRecipe({ ...recipe, ingredientsSetTwo: newIngredients });
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
		index: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const newIngredients = [...recipe.ingredientsSetTwo];
		newIngredients[index] = event.target.value;
		setRecipe({ ...recipe, ingredientsSetTwo: newIngredients });
	};

	const addMoreIngredientsSetTwo = () => {
		setRecipe((prevRecipe) => ({
			...prevRecipe,
			ingredientsSetTwo: [...prevRecipe.ingredientsSetTwo, ''],
		}));
	};

	const editorContent = (content: string) => {
		setRecipe({ ...recipe, instructions: content });
	};

	return (
		<>
			{error && <p className="error">{error}</p>}
			<form className="recipe_form" onSubmit={handleSubmit}>
				<div className="recipe_form__main">
					<input
						type="text"
						placeholder="Title"
						name="title"
						value={recipe.title}
						onChange={handleChange}
					/>

					<Tiptap
						getContent={editorContent}
						content={recipe.instructions}
					/>
					<textarea
						placeholder="Notes"
						name="notes"
						value={recipe.notes}
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="Categories seperated by commas"
						name="category"
						value={recipe.category}
						onChange={handleChange}
					/>
					<button type="submit">Save</button>
				</div>
				<div className="recipe_form__ingredients_wrapper">
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
									/>
									<button
										className="ingredients_delete"
										onClick={() => removeIngredient(index)}
									>
										-
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
											<div className="ingredient_wrapper">
												<input
													type="text"
													placeholder={`Ingredient ${
														index + 1
													}`}
													name={`ingredient${index}`}
													value={ingredient || ''}
													onChange={(event) =>
														handleIngredientChangeSetTwo(
															index,
															event
														)
													}
												/>
												<button
													className="ingredients_delete"
													onClick={() =>
														removeIngredientsSetTwo(
															index
														)
													}
												>
													-
												</button>
											</div>
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
										Remove Ingredient Set
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</form>
		</>
	);
};

export default RecipeForm;
