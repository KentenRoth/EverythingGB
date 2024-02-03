import { useState } from 'react';
import Tabs from '../Components/tabs';
import Create from './create';
import Recipes from '../Components/recipes';

const Main = () => {
	const [tabs, setTabs] = useState([
		{
			title: 'Recipes',
			isActive: true,
			isPrivate: false,
			id: 'recipe',
		},
		{
			title: 'Bookmarks',
			isActive: false,
			isPrivate: false,
			id: 'bookmark',
		},
		{
			title: 'Settings',
			isActive: false,
			isPrivate: false,
			id: 'settings',
		},
		{
			title: 'Admin',
			isActive: false,
			isPrivate: true,
			id: 'admin',
		},
		{
			title: 'Create',
			isActive: false,
			isPrivate: true,
			id: 'create',
		},
	]);

	let handleTabClick = (id: string) => {
		let newTabs = tabs.map((tab) => {
			if (tab.id === id) {
				return { ...tab, isActive: true };
			} else {
				return { ...tab, isActive: false };
			}
		});
		setTabs(newTabs);
	};

	const activeTab = tabs.find((tab) => tab.isActive);

	let activeTabContent = () => {
		switch (activeTab?.id) {
			case 'create':
				return <Create />;
			default:
				return <Recipes />;
		}
	};

	return (
		<>
			<Tabs tabs={tabs} handleTabClick={handleTabClick} />
			{activeTabContent()}
		</>
	);
};

export default Main;
