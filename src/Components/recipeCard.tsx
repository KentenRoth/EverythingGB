import { Recipe } from '../types';

interface RecipeCardProps {
	recipe: Recipe;
	show: (id: string) => void;
}

const RecipeCard = (props: RecipeCardProps) => {
	const { show } = props;
	return (
		<>
			<a className="recipe_card" onClick={() => show(props.recipe._id)}>
				<p className="recipe_card__title">{props.recipe.title}</p>
				<p className="recipe_card__user">{props.recipe.user.name}</p>
			</a>
		</>
	);
};

export default RecipeCard;
