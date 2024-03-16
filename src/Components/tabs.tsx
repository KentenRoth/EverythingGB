import { useState } from 'react';

type Tab = {
	title: string;
	isActive: boolean;
	isPrivate: boolean;
	id: string;
};

interface TabsProps {
	tabs: Tab[];
	handleTabClick: (id: string) => void;
}

const Tabs = (props: TabsProps) => {
	const [mobileMenu, setMobileMenu] = useState(false);

	const toggleMenu = () => {
		setMobileMenu(!mobileMenu);
	};

	return (
		<>
			<div className="tabs">
				<div className="desktop">
					{props.tabs.map((tab) => (
						<a
							key={tab.id}
							className={`tab ${tab.isActive ? 'active' : ''}`}
							onClick={() => props.handleTabClick(tab.id)}
						>
							<p>{tab.title}</p>
						</a>
					))}
				</div>

				<div className="tabs-toggle mobile" onClick={toggleMenu}>
					<div className={`hamburger ${mobileMenu ? 'open' : ''}`}>
						<span className="bar1"></span>
						<span className="bar2"></span>
						<span className="bar3"></span>
					</div>
				</div>
				<div
					className={`mobile-tabs_links ${mobileMenu ? 'open' : ''}`}
					onClick={toggleMenu}
				>
					{props.tabs.map((tab) => (
						<a
							key={tab.id}
							className={`tab ${tab.isActive ? 'active' : ''}`}
							onClick={() => props.handleTabClick(tab.id)}
						>
							<p>{tab.title}</p>
						</a>
					))}
				</div>
			</div>
		</>
	);
};

export default Tabs;
