import { Recipe } from '../types';

type ShownRecipeProps = {
	recipe: Recipe | null;
};

const ShownRecipe = (props: ShownRecipeProps) => {
	if (!props.recipe) {
		return null;
	}
	return (
		<>
			<div className="shown-recipe">
				<div className="title">
					<h1>{props.recipe.title}</h1>
				</div>
				<div className="ingredients">
					<div className="set-one">
						<h2>Ingredients</h2>
						<ul>
							{props.recipe.ingredients.map(
								(ingredient, index) => {
									return <li key={index}>{ingredient}</li>;
								}
							)}
						</ul>
					</div>
					{props.recipe.ingredientsSetTwo &&
						props.recipe.ingredientsSetTwo.length > 0 && (
							<div className="set-two">
								<h2>Ingredients Set 2</h2>
								<ul>
									{props.recipe.ingredientsSetTwo.map(
										(ingredient, index) => (
											<li key={index}>{ingredient}</li>
										)
									)}
								</ul>
							</div>
						)}
				</div>
				<div className="instructions">
					<h2>Instructions</h2>
					<div
						dangerouslySetInnerHTML={{
							__html: props.recipe.instructions,
						}}
					/>
				</div>
				{props.recipe.notes && (
					<div className="notes">
						<h2>Notes</h2>
						<p>{props.recipe.notes}</p>
					</div>
				)}
				<div className="categories">
					<h2>Categories</h2>
					<p>{props.recipe.category}</p>
				</div>
			</div>
		</>
	);
};

export default ShownRecipe;
