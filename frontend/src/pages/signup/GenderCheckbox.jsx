 const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	const isMale = selectedGender === 'male';
	const isFemale = selectedGender === 'female';
 	return (
 		<div className='flex'>
 			<div className='form-control'>
 				<label className={`label gap-2 cursor-pointer ${isMale ? "selected" : ""}`}>
 					<span className='label-text'>Male</span>
 					<input 
						type='checkbox' 
						className='checkbox border-slate-900'
						checked={isMale}
						onChange={() => onCheckboxChange('male')}
					/>
 				</label>
 			</div>
 			<div className='form-control'>
 				<label className={`label gap-2 cursor-pointer ${isFemale ? "selected" : ""}`}>
 					<span className='label-text'>Female</span>
 					<input 
						type='checkbox' 
						className='checkbox border-slate-900'
						checked={isFemale}
						onChange={() => onCheckboxChange('female')}
					/>
 				</label>
 			</div>
 		</div>
 	);
 };
 export default GenderCheckbox;