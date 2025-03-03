import { Filters } from '@/types/anime';
import { FilterButton } from './FilterButton';
import { FilterContent } from './FilterContent';
import { useAnimeFilters } from './hooks/useAnimeFilters';

interface AnimeFiltersProps {
	filters: Filters;
	onFilterChange: (filters: Filters) => void;
}

export function AnimeFilters({ filters, onFilterChange }: AnimeFiltersProps) {
	const { isOpen, hasActiveFilters, toggleFilters, clearFilters } =
		useAnimeFilters({
			filters,
			onFilterChange,
		});

	return (
		<div className="mb-8 relative">
			<FilterButton
				isOpen={isOpen}
				hasActiveFilters={hasActiveFilters}
				onClick={toggleFilters}
			/>
			<FilterContent
				isOpen={isOpen}
				filters={filters}
				onFilterChange={onFilterChange}
				hasActiveFilters={hasActiveFilters}
				onClearFilters={clearFilters}
			/>
		</div>
	);
}
