import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ProfileSettings from "../ProfileSettings";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
	const [showSettings, setShowSettings] = useState(false);

	return (
		<div className='w-80 bg-white/5 border-r border-white/10 flex flex-col'>
			{/* Header */}
			<div className='p-6 border-b border-white/10'>
				<h2 className='text-2xl font-bold text-white mb-4'>Chats</h2>
				<SearchInput />
			</div>
			
			{/* Conversations */}
			<div className='flex-1 overflow-y-auto'>
				<Conversations />
			</div>
			
			{/* Footer */}
			<div className='p-4 border-t border-white/10 flex justify-between items-center'>
				<button 
					onClick={() => setShowSettings(true)}
					className='p-3 hover:bg-white/10 rounded-full transition-colors duration-200 group'
					title="Settings"
				>
					<IoSettings className='w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200' />
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