import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === (authUser.user?._id || authUser._id);
	const formattedTime = extractTime(message.createdAt);
	const profilePic = fromMe ? (authUser.user?.profilepic || authUser.profilepic) : selectedConversation?.profilepic;

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`flex mb-4 ${fromMe ? 'justify-end' : 'justify-start'}`}>
			<div className={`flex max-w-[70%] ${fromMe ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
				{/* Avatar */}
				<div className='w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0'>
					{profilePic ? (
						<img 
							src={profilePic} 
							alt='profile' 
							className='w-full h-full object-cover'
						/>
					) : (
						<span className='text-white text-xs font-semibold'>
							{fromMe 
								? (authUser.user?.fullname || authUser.fullname)?.charAt(0).toUpperCase()
								: selectedConversation?.fullname?.charAt(0).toUpperCase()
							}
						</span>
					)}
				</div>

				{/* Message Bubble */}
				<div className={`${shakeClass}`}>
					<div className={`px-4 py-2 rounded-2xl shadow-lg ${
						fromMe 
							? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm' 
							: 'bg-white/10 text-white rounded-bl-sm backdrop-blur-sm border border-white/20'
					}`}>
						<p className='text-sm leading-relaxed'>{message.message}</p>
					</div>
					<div className={`text-xs text-gray-400 mt-1 ${fromMe ? 'text-right' : 'text-left'}`}>
						{formattedTime}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Message;