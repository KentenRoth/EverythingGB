import RecipeForm from '../Components/RecipeForm';

const Create = () => {
	return (
		<>
			<div className="create-recipe">
				<div className="create-recipe_container">
					<h1>Create Recipe</h1>
					<div className="recipe-form_container">
						<RecipeForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Create;
