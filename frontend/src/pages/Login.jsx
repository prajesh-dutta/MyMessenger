import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { FaGoogle, FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				{/* Main Card */}
				<div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:scale-105'>
					{/* Header */}
					<div className='text-center mb-8'>
						<div className='bg-gradient-to-r from-blue-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
							<FaEnvelope className='text-white text-2xl' />
						</div>
						<h1 className='text-4xl font-bold text-white mb-2'>
							Welcome Back
						</h1>
						<p className='text-gray-300 text-lg'>
							Sign in to <span className='text-blue-400 font-semibold'>MyMessenger</span>
						</p>
					</div>

					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Username Field */}
						<div className='relative'>
							<label className='block text-gray-300 text-sm font-medium mb-2'>
								Username
							</label>
							<div className='relative'>
								<FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='text'
									placeholder='Enter your username'
									className='w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className='relative'>
							<label className='block text-gray-300 text-sm font-medium mb-2'>
								Password
							</label>
							<div className='relative'>
								<FaLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='password'
									placeholder='Enter your password'
									className='w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						{/* Sign Up Link */}
						<div className='text-center'>
							<Link 
								to='/signup' 
								className='text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300'
							>
								Don't have an account? Sign up here
							</Link>
						</div>

						{/* Login Button */}
						<button 
							type='submit'
							className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg' 
							disabled={loading}
						>
							{loading ? (
								<div className='flex items-center justify-center'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
									Signing in...
								</div>
							) : (
								"Sign In"
							)}
						</button>

						{/* Divider */}
						<div className='relative my-6'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-600'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-4 bg-transparent text-gray-400'>Or continue with</span>
							</div>
						</div>

						{/* Google Button */}
						<a 
							href='/api/auth/google' 
							className='w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 transform hover:translate-y-[-2px] flex items-center justify-center gap-3 shadow-lg'
						>
							<FaGoogle className='text-lg' />
							Continue with Google
						</a>
					</form>
				</div>

				{/* Footer */}
				<div className='text-center mt-6'>
					<p className='text-gray-400 text-sm'>
						Secure • Private • Encrypted
					</p>
				</div>
			</div>
		</div>
	);
};
export default Login;