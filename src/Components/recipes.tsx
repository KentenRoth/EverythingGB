import { useEffect, useState } from 'react';
import instance from '../axios/axios';
import ShownRecipe from './shownRecipe';

import { Recipe } from '../types';
import RecipeCard from './recipeCard';

const Recipes = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [bookmarks, setBookmarks] = useState<string[]>(['']);
	const [shownRecipe, setShownRecipe] = useState<Recipe>({
		_id: '',
		title: '',
		ingredients: [''],
		instructions: '',
		category: '',
		notes: '',
		ingredientsSetTwo: [''],
		user: { id: '', name: '', role: '', bookmarks: [''] },
	});

	useEffect(() => {
		let getRecipes = async () => {
			try {
				const response = await instance.get('/recipes');
				setRecipes(response.data.data);
				setShownRecipe(response.data.data[0]);
			} catch (error) {
				console.log(error);
			}
		};

		let getBookmarks = async () => {
			try {
				const response = await instance.get('/users/me');
				setBookmarks(response.data.bookmarks);
			} catch (error) {
				console.log(error);
			}
		};
		getBookmarks();
		getRecipes();
	}, []);

	let handleRecipeClick = (id: string) => {
		console.log('Recipe clicked');
		let newRecipe = recipes.find((recipe) => recipe._id === id);
		setShownRecipe(newRecipe!);
	};

	let handleBookmarkClick = (event: React.MouseEvent, id: string) => {
		event.stopPropagation();
		let newBookmarks: string[] = [''];
		if (bookmarks.includes(id)) {
			console.log('Removing bookmark');
			newBookmarks = bookmarks.filter((bookmark) => bookmark !== id);
		} else {
			newBookmarks = [...bookmarks, id];
		}
		setBookmarks(newBookmarks);
		updateBooksmarks(newBookmarks);
	};

	let updateBooksmarks = async (newBookmarks: string[]) => {
		try {
			await instance.patch('/users/me', {
				bookmarks: newBookmarks,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="recipes_wrapper">
				<div className="recipes">
					{recipes.map((recipe) => (
						<RecipeCard
							recipe={recipe}
							show={handleRecipeClick}
							onBookmarkClick={handleBookmarkClick}
							bookmark={bookmarks.includes(recipe._id)}
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
