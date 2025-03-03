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
				className="block text-base md:text-sm font-medium text-gray-700 mb-2">
				{label}
			</label>
			<div className="relative">
				<button
					ref={buttonRef}
					type="button"
					onClick={toggleSelect}
					className="w-full flex items-center justify-between px-4 py-3 md:py-2 h-10 text-base md:text-sm rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
					<span className="!text-gray-900">{value || placeholder}</span>
					<ChevronDown
						size={20}
						className={`text-gray-500 transition-transform ${
							isSelectOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{isSelectOpen && (
					<div
						className={`absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${
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
							className="w-full px-4 py-4 md:py-2 text-left text-base text-gray-900 md:text-sm hover:bg-gray-100 focus:bg-gray-100">
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
								className="w-full px-4 py-4 md:py-2 text-left text-base md:text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100">
								{option}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
