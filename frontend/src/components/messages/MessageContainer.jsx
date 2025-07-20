import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex-1 flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-white/5 border-b border-white/10 px-6 py-4 flex items-center'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center'>
								<span className='text-white font-semibold text-sm'>
									{selectedConversation.fullname.charAt(0).toUpperCase()}
								</span>
							</div>
							<div>
								<h3 className='text-white font-semibold text-lg'>{selectedConversation.fullname}</h3>
								<p className='text-gray-400 text-sm'>Online</p>
							</div>
						</div>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='text-center'>
				<div className='bg-gradient-to-r from-blue-400 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
					<TiMessages className='text-white text-3xl' />
				</div>
				<h2 className='text-3xl font-bold text-white mb-2'>
					Welcome back, {authUser.user?.fullname || authUser.fullname}! 👋
				</h2>
				<p className='text-gray-300 text-lg mb-6'>
					Select a conversation to start messaging
				</p>
				<div className='bg-white/5 rounded-xl p-6 max-w-md mx-auto border border-white/10'>
					<p className='text-gray-400 text-sm'>
						🔒 Your messages are end-to-end encrypted
					</p>
				</div>
			</div>
		</div>
	);
};