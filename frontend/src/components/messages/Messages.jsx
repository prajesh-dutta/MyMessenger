import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='flex-1 overflow-auto px-6 py-4'>
			{!loading && messages.length > 0 && (
				<div className='space-y-1'>
					{messages.map((message) => (
						<div key={message._id} ref={lastMessageRef}>
							<Message message={message} />
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className='space-y-4'>
					{[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
				</div>
			)}
			
			{!loading && messages.length === 0 && (
				<div className='flex items-center justify-center h-full'>
					<div className='text-center'>
						<div className='bg-white/5 rounded-xl p-6 border border-white/10'>
							<p className='text-gray-300 mb-2'>No messages yet</p>
							<p className='text-gray-400 text-sm'>Send a message to start the conversation</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Messages;