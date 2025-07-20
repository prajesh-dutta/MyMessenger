import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<div
			className={`mx-4 mb-2 p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
				isSelected 
					? "bg-blue-500/20 border border-blue-400/30 shadow-lg" 
					: "bg-white/5 hover:bg-white/10 border border-transparent"
			}`}
			onClick={() => setSelectedConversation(conversation)}
		>
			<div className='flex items-center gap-3'>
				<div className='relative'>
					<div className='w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center'>
						{conversation.profilepic ? (
							<img 
								src={conversation.profilepic} 
								alt='user avatar' 
								className='w-full h-full object-cover'
							/>
						) : (
							<span className='text-white font-semibold text-lg'>
								{conversation.fullname.charAt(0).toUpperCase()}
							</span>
						)}
					</div>
					{isOnline && (
						<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
					)}
				</div>

				<div className='flex-1 min-w-0'>
					<div className='flex items-center justify-between'>
						<h4 className='font-semibold text-white truncate'>{conversation.fullname}</h4>
						<span className='text-lg ml-2'>{emoji}</span>
					</div>
					<p className='text-gray-400 text-sm'>
						{isOnline ? "Online" : "Offline"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default Conversation;