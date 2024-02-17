import { useEffect, useState } from 'react';
import instance from '../axios/axios';
import ShownRecipe from './shownRecipe';

import { Recipe } from '../types';
import RecipeCard from './recipeCard';
import Search from './serach';

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
	const [totalRecipes, setTotalRecipes] = useState<number>();
	const [totalPages, setTotalPages] = useState<number>();
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		let getRecipes = async () => {
			try {
				const response = await instance.get('/recipes');
				setTotalRecipes(response.data.total);
				setTotalPages(response.data.pages);
				setRecipes(response.data.data);
				setShownRecipe(response.data.data[0]);
				setCurrentPage(1);
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
				setTotalRecipes(response.data.total);
				setTotalPages(response.data.pages);
				setRecipes(response.data.data);
				setShownRecipe(response.data.data[0]);
				setCurrentPage(1);
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
		let newRecipe = recipes.find((recipe) => recipe._id === id);
		setShownRecipe(newRecipe!);
	};

	let handleBookmarkClick = (event: React.MouseEvent, id: string) => {
		event.stopPropagation();
		let newBookmarks: string[] = [''];
		if (bookmarksIds.includes(id)) {
			newBookmarks = bookmarksIds.filter((bookmark) => bookmark !== id);
		} else {
			newBookmarks = [...bookmarksIds, id];
		}
		setBookmarksIds(newBookmarks);
		updateBooksmarks(newBookmarks);
	};

	let handleSearch = async (value: string) => {
		let url = '/recipes/search?q=';
		if (props.show === 'bookmarks') {
			url = '/users/me/bookmarks?q=';
		}

		try {
			const response = await instance.get(`${url}${value}`);
			let data = response.data.data;
			setRecipes(data);
		} catch (error) {
			console.log(error);
		}
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

	let getMoreRecipes = async () => {
		let url = '/recipes?page=';
		if (props.show === 'bookmarks') {
			url = '/users/me/bookmarks?page=';
		}
		try {
			const response = await instance.get(`${url}${currentPage + 1}`);
			let data = response.data.data;
			setRecipes([...recipes, ...data]);
			setCurrentPage(currentPage + 1);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="recipes_wrapper">
				<div className="recipes">
					<div className="search_wrapper">
						<Search search={handleSearch} />
					</div>
					{recipes.map((recipe) => (
						<RecipeCard
							recipe={recipe}
							show={handleRecipeClick}
							onBookmarkClick={handleBookmarkClick}
							bookmark={bookmarksIds.includes(recipe._id)}
							key={recipe._id}
						/>
					))}
					<div className="load-more_wrapper">
						<button
							className="load-more"
							onClick={getMoreRecipes}
							disabled={currentPage === totalPages}
						>
							Load more
						</button>
						<p className="load-more_totals">
							Showing {recipes.length} of {totalRecipes} recipes
						</p>
					</div>
				</div>
				<div className="shown-recipe_wrapper">
					<ShownRecipe recipe={shownRecipe} />
				</div>
			</div>
		</>
	);
};

export default Recipes;
