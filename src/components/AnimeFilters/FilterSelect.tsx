import { ChevronDown } from 'lucide-react';
import { useFilterSelect } from './hooks/useFilterSelect';

interface FilterSelectProps {
	label: string;
	id: string;
	value: string;
	onChange: (value: string) => void;
	options: (string | number)[];
	placeholder: string;
}

export function FilterSelect({
	label,
	id,
	value,
	onChange,
	options,
	placeholder,
}: FilterSelectProps) {
	const {
		isSelectOpen,
		dropdownPosition,
		selectRef,
		buttonRef,
		toggleSelect,
		closeSelect,
	} = useFilterSelect();

	return (
		<div className="w-full" ref={selectRef}>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-300 mb-1.5">
				{label}
			</label>
			<div className="relative">
				<button
					ref={buttonRef}
					type="button"
					onClick={toggleSelect}
					className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors">
					<span className={value ? 'text-gray-200' : 'text-gray-400'}>
						{value || placeholder}
					</span>
					<ChevronDown
						size={16}
						className={`text-gray-400 transition-transform duration-200 ${
							isSelectOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{isSelectOpen && (
					<div
						className={`absolute z-20 w-full bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto ${
							dropdownPosition === 'top'
								? 'bottom-[calc(100%+0.25rem)]'
								: 'top-[calc(100%+0.25rem)]'
						}`}>
						<button
							type="button"
							onClick={() => {
								onChange('');
								closeSelect();
							}}
							className="w-full px-3 py-2 text-left text-sm text-gray-400 hover:bg-gray-700 hover:text-gray-200 focus:bg-gray-700 focus:text-gray-200 transition-colors">
							{placeholder}
						</button>
						{options.map((option) => (
							<button
								key={option}
								type="button"
								onClick={() => {
									onChange(option.toString());
									closeSelect();
								}}
								className="w-full px-3 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 focus:bg-gray-700 transition-colors">
								{option}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
