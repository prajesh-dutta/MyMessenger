import { FaMars, FaVenus } from "react-icons/fa";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className='space-y-3'>
			<label className='block text-gray-300 text-sm font-medium'>
				Gender
			</label>
			<div className='flex gap-4'>
				<div 
					className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
						selectedGender === "male" 
							? "bg-blue-500/20 border-blue-400 text-blue-300" 
							: "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
					}`}
					onClick={() => onCheckboxChange("male")}
				>
					<label className='flex items-center gap-3 cursor-pointer'>
						<FaMars className='text-lg' />
						<span className='font-medium'>Male</span>
						<input
							type='checkbox'
							className='ml-auto w-4 h-4 accent-blue-500'
							checked={selectedGender === "male"}
							onChange={() => onCheckboxChange("male")}
						/>
					</label>
				</div>
				<div 
					className={`flex-1 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
						selectedGender === "female" 
							? "bg-pink-500/20 border-pink-400 text-pink-300" 
							: "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
					}`}
					onClick={() => onCheckboxChange("female")}
				>
					<label className='flex items-center gap-3 cursor-pointer'>
						<FaVenus className='text-lg' />
						<span className='font-medium'>Female</span>
						<input
							type='checkbox'
							className='ml-auto w-4 h-4 accent-pink-500'
							checked={selectedGender === "female"}
							onChange={() => onCheckboxChange("female")}
						/>
					</label>
				</div>
			</div>
		</div>
	);
};
export default GenderCheckbox;