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
	return (
		<>
			<div className="tabs">
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
		</>
	);
};

export default Tabs;
