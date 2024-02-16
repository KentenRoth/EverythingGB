import { useState } from 'react';

interface IProps {
	search(value: string): void;
}

const Search = (props: IProps) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSearchClick = () => {
		props.search(searchValue);
	};

	return (
		<>
			<input
				type="text"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<button onClick={handleSearchClick}>Search</button>
		</>
	);
};

export default Search;
