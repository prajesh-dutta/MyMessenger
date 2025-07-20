import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<div className='p-6 border-t border-white/10'>
			<form onSubmit={handleSubmit} className='relative'>
				<input
					type='text'
					className='w-full pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
					placeholder='Type your message...'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button 
					type='submit' 
					disabled={loading || !message.trim()}
					className='absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors duration-200'
				>
					{loading ? (
						<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
					) : (
						<BsSend className='w-4 h-4 text-white' />
					)}
				</button>
			</form>
		</div>
	);
};
export default MessageInput;