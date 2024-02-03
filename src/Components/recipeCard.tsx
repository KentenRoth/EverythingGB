import { Recipe } from '../types';
import BookmarkIcon from './bookmarkIcon';

interface RecipeCardProps {
	recipe: Recipe;
	show: (id: string) => void;
	onBookmarkClick: (event: React.MouseEvent, id: string) => void;
	bookmark: boolean;
}

const RecipeCard = (props: RecipeCardProps) => {
	const { show, onBookmarkClick } = props;
	let fill = '#2c2c2c';
	if (props.bookmark) {
		fill = '#212cff';
	}
	return (
		<>
			<a className="recipe_card" onClick={() => show(props.recipe._id)}>
				<p className="recipe_card__title">{props.recipe.title}</p>
				<p className="recipe_card__user">{props.recipe.user.name}</p>
				<div
					className="bookmark-icon"
					onClick={(event) =>
						onBookmarkClick(event, props.recipe._id)
					}
				>
					<BookmarkIcon fill={fill} />
				</div>
			</a>
		</>
	);
};

export default RecipeCard;
