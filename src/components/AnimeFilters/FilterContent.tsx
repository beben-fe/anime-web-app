import { X } from 'lucide-react';
import { Filters } from '@/types/anime';
import {
	ANIME_RATINGS,
	ANIME_SCORE,
	ANIME_STATUS,
	ANIME_TYPES,
} from '@/constant/filters';
import { FilterSelect } from './FilterSelect';

interface FilterContentProps {
	isOpen: boolean;
	filters: Filters;
	onFilterChange: (filters: Filters) => void;
	hasActiveFilters: boolean;
	onClearFilters: () => void;
}

export function FilterContent({
	isOpen,
	filters,
	onFilterChange,
	hasActiveFilters,
	onClearFilters,
}: FilterContentProps) {
	return (
		<div
			className={`absolute z-10 left-0 right-0 mt-2 bg-white rounded-lg shadow-md md:relative md:mt-0 border border-gray-600 ${
				!isOpen ? 'hidden md:block' : ''
			}`}>
			<div className="p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
					<FilterSelect
						label="Type"
						id="type"
						value={filters.type}
						onChange={(value) => onFilterChange({ ...filters, type: value })}
						options={ANIME_TYPES}
						placeholder="All Types"
					/>
					<FilterSelect
						label="Minimum Score"
						id="score"
						value={filters.score}
						onChange={(value) => onFilterChange({ ...filters, score: value })}
						options={ANIME_SCORE}
						placeholder="Any Score"
					/>
					<FilterSelect
						label="Status"
						id="status"
						value={filters.status}
						onChange={(value) => onFilterChange({ ...filters, status: value })}
						options={ANIME_STATUS}
						placeholder="All Status"
					/>
					<FilterSelect
						label="Age Rating"
						id="rating"
						value={filters.rating}
						onChange={(value) => onFilterChange({ ...filters, rating: value })}
						options={ANIME_RATINGS}
						placeholder="All Ratings"
					/>
				</div>

				{hasActiveFilters && (
					<div className="mt-4 flex justify-end">
						<button
							onClick={onClearFilters}
							className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2">
							<X size={16} />
							Clear All Filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
