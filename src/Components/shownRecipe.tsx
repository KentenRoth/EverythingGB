import { Recipe } from '../types';

type ShownRecipeProps = {
	recipe: Recipe;
};

const ShownRecipe = (props: ShownRecipeProps) => {
	return (
		<>
			<div className="shown-recipe">
				<h2>Shown</h2>
			</div>
		</>
	);
};

export default ShownRecipe;
