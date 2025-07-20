import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	
	return (
		<div className='py-4 flex flex-col overflow-auto'>
			{conversations.length === 0 && !loading ? (
				<div className='text-center py-8'>
					<p className='text-gray-400'>No conversations yet</p>
					<p className='text-gray-500 text-sm mt-1'>Start a new chat to get started</p>
				</div>
			) : (
				conversations.map((conversation, idx) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={idx === conversations.length - 1}
					/>
				))
			)}

			{loading && (
				<div className='flex justify-center py-4'>
					<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500'></div>
				</div>
			)}
		</div>
	);
};
export default Conversations;