import { useState } from 'react';
import { Filters } from '@/types/anime';

interface UseAnimeFiltersProps {
	filters: Filters;
	onFilterChange: (filters: Filters) => void;
}

interface UseAnimeFiltersReturn {
	isOpen: boolean;
	hasActiveFilters: boolean;
	toggleFilters: () => void;
	clearFilters: () => void;
}

export function useAnimeFilters({
	filters,
	onFilterChange,
}: UseAnimeFiltersProps): UseAnimeFiltersReturn {
	const [isOpen, setIsOpen] = useState(false);

	const clearFilters = () => {
		onFilterChange({
			type: '',
			score: '',
			status: '',
			rating: '',
			genres: [],
		});
	};

	const toggleFilters = () => setIsOpen(!isOpen);

	const hasActiveFilters = Boolean(
		filters.type ||
			filters.score ||
			filters.status ||
			filters.rating ||
			filters.genres.length > 0
	);

	return {
		isOpen,
		hasActiveFilters,
		toggleFilters,
		clearFilters,
	};
}
