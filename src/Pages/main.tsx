import { useState, useEffect } from 'react';
import instance from '../axios/axios';
import Tabs from '../Components/tabs';
import Create from './create';
import Recipes from '../Components/recipes';
import Settings from '../Components/settings';

const Main = () => {
	const [userRole, setUserRole] = useState('user');
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

	useEffect(() => {
		let getRole = async () => {
			try {
				const response = await instance.get('/users/me');
				setUserRole(response.data.role);
			} catch (error) {
				console.log(error);
			}
		};
		getRole();
	});

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
			case 'bookmark':
				return <Recipes show={'bookmarks'} />;

			case 'settings':
				return <Settings />;
			default:
				return <Recipes />;
		}
	};

	return (
		<>
			<Tabs
				tabs={tabs.filter(
					(tab) =>
						!(
							tab.isPrivate &&
							!['admin', 'grandma'].includes(userRole)
						)
				)}
				handleTabClick={handleTabClick}
			/>
			{activeTabContent()}
		</>
	);
};

export default Main;
