import { useEffect, useState } from 'react';
import instance from '../axios/axios';
import ShownRecipe from './shownRecipe';

import { Recipe } from '../types';
import RecipeCard from './recipeCard';

const Recipes = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [shownRecipe, setShownRecipe] = useState<Recipe>({
		_id: '',
		title: '',
		ingredients: [''],
		instructions: '',
		category: '',
		notes: '',
		ingredientsSetTwo: [''],
		user: { id: '', name: '', role: '' },
	});

	useEffect(() => {
		let getRecipes = async () => {
			try {
				const response = await instance.get('/recipes');
				setRecipes(response.data.data);
				setShownRecipe(response.data.data[0]);
				console.log(response.data.data);
			} catch (error) {
				console.log(error);
			}
		};

		getRecipes();
	}, []);

	let handleRecipeClick = (id: string) => {
		let newRecipe = recipes.find((recipe) => recipe._id === id);
		setShownRecipe(newRecipe!);
	};

	return (
		<>
			<div className="recipes_wrapper">
				<div className="recipes">
					{recipes.map((recipe) => (
						<RecipeCard
							recipe={recipe}
							show={handleRecipeClick}
							key={recipe._id}
						/>
					))}
				</div>
				<div className="shown-recipe_wrapper">
					<ShownRecipe recipe={shownRecipe} />
				</div>
			</div>
		</>
	);
};

export default Recipes;
