export interface Recipe {
	_id: string;
	title: string;
	ingredients: string[];
	ingredientsSetTwo?: string[];
	notes: string;
	category: string;
	instructions: string;
	user: User;
}

export interface User {
	id: string;
	name: string;
	role: string;
}
