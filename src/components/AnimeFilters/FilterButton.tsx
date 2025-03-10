import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface FilterButtonProps {
	isOpen: boolean;
	hasActiveFilters: boolean;
	onClick: () => void;
}

export function FilterButton({
	isOpen,
	hasActiveFilters,
	onClick,
}: FilterButtonProps) {
	return (
		<button
			onClick={onClick}
			className="md:hidden w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md h-10 text-gray-200 border border-gray-600">
			<div className="flex items-center gap-2">
				<Filter size={20} className="text-gray-200" />
				<span className="font-medium text-gray-200">Filters</span>
				{hasActiveFilters && (
					<span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-lg">
						Active
					</span>
				)}
			</div>
			{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
		</button>
	);
}
