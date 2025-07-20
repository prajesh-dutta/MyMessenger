import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { FaGoogle, FaUser, FaLock, FaUserPlus, FaIdCard } from "react-icons/fa";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullname: "",
		username: "",
		password: "",
		confirmpassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				{/* Main Card */}
				<div className='bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:scale-105'>
					{/* Header */}
					<div className='text-center mb-8'>
						<div className='bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
							<FaUserPlus className='text-white text-2xl' />
						</div>
						<h1 className='text-4xl font-bold text-white mb-2'>
							Join Us
						</h1>
						<p className='text-gray-300 text-lg'>
							Create your <span className='text-blue-400 font-semibold'>MyMessenger</span> account
						</p>
					</div>

					<form onSubmit={handleSubmit} className='space-y-5'>
						{/* Full Name Field */}
						<div className='relative'>
							<label className='block text-gray-300 text-sm font-medium mb-2'>
								Full Name
							</label>
							<div className='relative'>
								<FaIdCard className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='text'
									placeholder='John Doe'
									className='w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300'
									value={inputs.fullname}
									onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
								/>
							</div>
						</div>

						{/* Username Field */}
						<div className='relative'>
							<label className='block text-gray-300 text-sm font-medium mb-2'>
								Username
							</label>
							<div className='relative'>
								<FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='text'
									placeholder='johndoe'
									className='w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300'
									value={inputs.username}
									onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
									placeholder='Create a strong password'
									className='w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300'
									value={inputs.password}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
								/>
							</div>
						</div>

						{/* Confirm Password Field */}
						<div className='relative'>
							<label className='block text-gray-300 text-sm font-medium mb-2'>
								Confirm Password
							</label>
							<div className='relative'>
								<FaLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<input
									type='password'
									placeholder='Confirm your password'
									className='w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300'
									value={inputs.confirmpassword}
									onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })}
								/>
							</div>
						</div>

						{/* Gender Selection */}
						<div className='bg-white/5 rounded-xl p-4 border border-white/10'>
							<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
						</div>

						{/* Login Link */}
						<div className='text-center'>
							<Link 
								to='/login' 
								className='text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300'
							>
								Already have an account? Sign in here
							</Link>
						</div>

						{/* Sign Up Button */}
						<button 
							type='submit'
							className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg' 
							disabled={loading}
						>
							{loading ? (
								<div className='flex items-center justify-center'>
									<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
									Creating account...
								</div>
							) : (
								"Create Account"
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
						By signing up, you agree to our Terms of Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
};
export default SignUp;