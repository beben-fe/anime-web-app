import { useState, useEffect, useCallback } from 'react';
import { useAnimeList } from './useAnime';
import debounce from 'lodash/debounce';
import { Filters } from '@/types/anime';
import { useScreenSize } from './useScreenSize';

export function useAnimePage() {
	const [page, setPage] = useState(1);
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
		page,
		debouncedSearch,
		filters,
		itemsPerPage
	);

	const debouncedSetSearch = useCallback(
		debounce((value: string) => {
			setDebouncedSearch(value);
			setPage(1);
		}, 500),
		[setDebouncedSearch, setPage]
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
		setPage(1);
	};

	return {
		page,
		search,
		filters,
		data,
		isFetching,
		error,
		showScrollTop,
		setPage,
		setFilters,
		handleSearch,
		handleClearSearch,
		scrollToTop,
	};
}
