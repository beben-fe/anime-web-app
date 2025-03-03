'use client';

import { useAnimePage } from '@/hooks/useAnimePage';
import { SearchBar } from '@/components/SearchBar';
import { AnimeFilters } from '@/components/AnimeFilters';
import { AnimeGrid } from '@/components/AnimeGrid';
import { Pagination } from '@/components/Pagination';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function Home() {
	const {
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
	} = useAnimePage();

	if (error) return <div className="p-4">Error loading anime list</div>;

	return (
		<main className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Anime Explorer</h1>

			<SearchBar
				search={search}
				isFetching={isFetching}
				onSearch={handleSearch}
				onClear={handleClearSearch}
			/>

			<AnimeFilters filters={filters} onFilterChange={setFilters} />

			<AnimeGrid data={data} isFetching={isFetching} />

			{data && (
				<Pagination
					page={page}
					hasNextPage={data.pagination.has_next_page}
					lastVisiblePage={data.pagination.last_visible_page}
					onPageChange={setPage}
				/>
			)}

			<ScrollToTop visible={showScrollTop} onClick={scrollToTop} />
		</main>
	);
}
