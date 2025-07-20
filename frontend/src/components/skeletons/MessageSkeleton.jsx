const MessageSkeleton = () => {
	return (
		<div className='animate-pulse'>
			{/* Incoming message */}
			<div className='flex justify-start mb-4'>
				<div className='flex max-w-[70%] items-end gap-2'>
					<div className='w-8 h-8 bg-gray-600 rounded-full'></div>
					<div>
						<div className='bg-gray-600 rounded-2xl rounded-bl-sm px-4 py-2'>
							<div className='h-4 bg-gray-500 rounded w-32 mb-1'></div>
							<div className='h-4 bg-gray-500 rounded w-24'></div>
						</div>
						<div className='h-3 bg-gray-600 rounded w-12 mt-1'></div>
					</div>
				</div>
			</div>
			
			{/* Outgoing message */}
			<div className='flex justify-end mb-4'>
				<div className='flex max-w-[70%] flex-row-reverse items-end gap-2'>
					<div className='w-8 h-8 bg-gray-600 rounded-full'></div>
					<div>
						<div className='bg-gray-600 rounded-2xl rounded-br-sm px-4 py-2'>
							<div className='h-4 bg-gray-500 rounded w-28'></div>
						</div>
						<div className='h-3 bg-gray-600 rounded w-12 mt-1 ml-auto'></div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MessageSkeleton;