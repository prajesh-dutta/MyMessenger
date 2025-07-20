import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<button
			onClick={logout}
			disabled={loading}
			className='p-3 hover:bg-red-500/20 rounded-full transition-colors duration-200 group'
			title="Logout"
		>
			{loading ? (
				<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-red-400'></div>
			) : (
				<BiLogOut className='w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors duration-200' />
			)}
		</button>
	);
};
export default LogoutButton;