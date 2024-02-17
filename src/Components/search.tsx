import { FormEvent, useState } from 'react';

interface IProps {
	search(value: string): void;
}

const Search = (props: IProps) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchClick = (e: FormEvent) => {
		e.preventDefault();
		props.search(searchValue);
	};

	return (
		<form onSubmit={handleSearchClick}>
			<input
				type="text"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<button type="submit">Search</button>
		</form>
	);
};

export default Search;
