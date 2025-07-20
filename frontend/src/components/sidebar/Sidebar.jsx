import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ProfileSettings from "../ProfileSettings";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
	const [showSettings, setShowSettings] = useState(false);

	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<div className='mt-auto flex justify-between items-center'>
				<button 
					onClick={() => setShowSettings(true)}
					className='p-2 hover:bg-gray-600 rounded-full'
				>
					<IoSettings className='w-5 h-5 text-white' />
				</button>
				<LogoutButton />
			</div>
			
			{showSettings && (
				<ProfileSettings onClose={() => setShowSettings(false)} />
			)}
		</div>
	);
};
export default Sidebar;