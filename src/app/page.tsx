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
		setFilters,
		handleSearch,
		handleClearSearch,
		scrollToTop,
		setPage,
	} = useAnimePage();

	if (error) return <div className="p-4">Error loading anime list</div>;

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="flex sm:flex-row flex-col justify-between items-center mb-0  w-full">
				<h1 className="text-4xl font-bold mb-8">Anime Explorer</h1>

				<SearchBar
					search={search}
					isFetching={isFetching}
					onSearch={handleSearch}
					onClear={handleClearSearch}
				/>
			</div>

			<AnimeFilters filters={filters} onFilterChange={setFilters} />

			{!isFetching && data?.data?.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-lg text-gray-600">
						No anime found matching your criteria
					</p>
					{search && (
						<button
							onClick={handleClearSearch}
							className="mt-4 text-blue-500 hover:text-blue-600">
							Clear search
						</button>
					)}
				</div>
			) : (
				<AnimeGrid data={data} isFetching={isFetching} />
			)}

			{data && data?.data?.length > 0 && (
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
