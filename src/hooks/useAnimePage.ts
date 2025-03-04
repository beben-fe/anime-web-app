import { useState, useEffect, useCallback } from 'react';
import { useAnimeList } from './useAnime';
import debounce from 'lodash/debounce';
import { Filters } from '@/types/anime';
import { useScreenSize } from './useScreenSize';
import { usePage } from '@/context/PageContext';

export function useAnimePage() {
	const { currentPage, setCurrentPage } = usePage();
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState(search);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [filters, setFilters] = useState<Filters>({
		type: '',
		score: '',
		status: '',
		rating: '',
		genres: [],
	});

	const { itemsPerPage } = useScreenSize();

	const { data, isFetching, error } = useAnimeList(
		currentPage,
		debouncedSearch,
		filters,
		itemsPerPage
	);

	const debouncedSetSearch = useCallback(
		debounce((value: string) => {
			setDebouncedSearch(value);
			setCurrentPage(1);
		}, 500),
		[setDebouncedSearch, setCurrentPage]
	);

	useEffect(() => {
		return () => {
			debouncedSetSearch.cancel();
		};
	}, [debouncedSetSearch]);

	useEffect(() => {
		if (!isFetching && data) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [data, isFetching]);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleSearch = (value: string) => {
		setSearch(value);
		debouncedSetSearch(value);
	};

	const handleClearSearch = () => {
		setSearch('');
		setDebouncedSearch('');
		debouncedSetSearch.cancel();
		setCurrentPage(1);
	};

	return {
		page: currentPage,
		search,
		filters,
		data,
		isFetching,
		error,
		showScrollTop,
		setPage: setCurrentPage,
		setFilters,
		handleSearch,
		handleClearSearch,
		scrollToTop,
	};
}
