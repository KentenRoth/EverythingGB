import { useEffect, useState } from 'react';
import instance from '../axios/axios';
import ShownRecipe from './shownRecipe';

import { Recipe } from '../types';
import RecipeCard from './recipeCard';

interface Props {
	show?: string;
}

const Recipes = (props: Props) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [bookmarksIds, setBookmarksIds] = useState<string[]>(['']);
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

		let getBookmarksIds = async () => {
			try {
				const response = await instance.get('/users/me');
				setBookmarksIds(response.data.bookmarks);
			} catch (error) {
				console.log(error);
			}
		};

		let getBookmarks = async () => {
			try {
				const response = await instance.get('/users/me/bookmarks');
				setRecipes(response.data);
				setShownRecipe(response.data[0]);
			} catch (error) {
				console.error(error);
			}
		};

		if (props.show === 'bookmarks') {
			getBookmarks();
		} else {
			getRecipes();
		}
		getBookmarksIds();
	}, [props.show]);

	let handleRecipeClick = (id: string) => {
		console.log('Recipe clicked');
		let newRecipe = recipes.find((recipe) => recipe._id === id);
		setShownRecipe(newRecipe!);
	};

	let handleBookmarkClick = (event: React.MouseEvent, id: string) => {
		event.stopPropagation();
		let newBookmarks: string[] = [''];
		if (bookmarksIds.includes(id)) {
			console.log('Removing bookmark');
			newBookmarks = bookmarksIds.filter((bookmark) => bookmark !== id);
		} else {
			newBookmarks = [...bookmarksIds, id];
		}
		setBookmarksIds(newBookmarks);
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
							bookmark={bookmarksIds.includes(recipe._id)}
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
