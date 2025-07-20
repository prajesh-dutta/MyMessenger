import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";

const Home = () => {
	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-6xl h-[700px] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex overflow-hidden'>
				<Sidebar />
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;