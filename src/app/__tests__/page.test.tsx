import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '@/test/test-utils';
import Home from '../page';
import { useAnimePage } from '@/hooks/useAnimePage';
import { mockAnimeResponse, mockEmptyFilters } from '@/test/mocks';
import { Filters, AnimeData } from '@/types/anime';

// Mock the useAnimePage hook
jest.mock('@/hooks/useAnimePage', () => ({
	useAnimePage: jest.fn(),
}));

// Mock the components used in the Home page
jest.mock('@/components/SearchBar', () => ({
	__esModule: true,
	SearchBar: ({
		value,
		onSearch,
		onClear,
	}: {
		value: string;
		onSearch: (value: string) => void;
		onClear: () => void;
		isFetching: boolean;
	}) => (
		<div data-testid="search-bar">
			<input
				data-testid="search-input"
				value={value || ''}
				onChange={(e) => onSearch(e.target.value)}
			/>
			<button data-testid="clear-button" onClick={onClear}>
				Clear
			</button>
		</div>
	),
}));

jest.mock('@/components/AnimeFilters', () => ({
	__esModule: true,
	AnimeFilters: ({
		filters,
		onFilterChange,
	}: {
		filters: Filters;
		onFilterChange: (filters: Filters) => void;
	}) => (
		<div data-testid="anime-filters">
			<button
				data-testid="change-filters"
				onClick={() => onFilterChange({ ...filters, type: 'TV' })}>
				Change Filters
			</button>
		</div>
	),
}));

jest.mock('@/components/AnimeGrid', () => ({
	__esModule: true,
	AnimeGrid: ({ data, isFetching }: { data: any; isFetching: boolean }) => (
		<div data-testid="anime-grid">
			{data?.data?.map((anime: AnimeData) => (
				<div key={anime.mal_id} data-testid="anime-card">
					{anime.title}
				</div>
			))}
		</div>
	),
}));

jest.mock('@/components/Pagination', () => ({
	__esModule: true,
	Pagination: ({
		page,
		onPageChange,
		lastVisiblePage,
		hasNextPage,
	}: {
		page: number;
		onPageChange: (page: number) => void;
		lastVisiblePage: number;
		hasNextPage: boolean;
	}) => (
		<div data-testid="pagination">
			<span>
				Page {page} of {lastVisiblePage}
			</span>
			<button onClick={() => onPageChange(page + 1)}>Next</button>
		</div>
	),
}));

jest.mock('@/components/ScrollToTop', () => ({
	__esModule: true,
	ScrollToTop: ({
		visible,
		onClick,
	}: {
		visible: boolean;
		onClick: () => void;
	}) =>
		visible ? (
			<button data-testid="scroll-top" onClick={onClick}>
				Scroll to Top
			</button>
		) : null,
}));

describe('Home Page', () => {
	// Default mock implementation
	const defaultMockImplementation = {
		page: 1,
		search: '',
		filters: mockEmptyFilters,
		data: mockAnimeResponse,
		isFetching: false,
		error: null,
		showScrollTop: false,
		setPage: jest.fn(),
		setFilters: jest.fn(),
		handleSearch: jest.fn(),
		handleClearSearch: jest.fn(),
		scrollToTop: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useAnimePage as jest.Mock).mockReturnValue({
			...defaultMockImplementation,
		});
	});

	test('renders the search bar and anime filters', () => {
		render(<Home />);

		expect(screen.getByTestId('search-bar')).toBeInTheDocument();
		expect(screen.getByTestId('anime-filters')).toBeInTheDocument();
	});

	test('renders loading state when isFetching is true', () => {
		(useAnimePage as jest.Mock).mockReturnValue({
			...defaultMockImplementation,
			isFetching: true,
		});

		render(<Home />);

		expect(screen.getByTestId('anime-filters')).toBeInTheDocument();
		expect(screen.getByTestId('anime-grid')).toBeInTheDocument();
	});

	test('renders error message when there is an error', () => {
		(useAnimePage as jest.Mock).mockReturnValue({
			...defaultMockImplementation,
			error: new Error('Failed to fetch anime'),
			data: null,
		});

		render(<Home />);

		expect(screen.getByText('Error loading anime list')).toBeInTheDocument();
	});

	test('renders "No anime found" message when there is no data', () => {
		(useAnimePage as jest.Mock).mockReturnValue({
			...defaultMockImplementation,
			data: {
				data: [],
				pagination: {
					current_page: 1,
					last_visible_page: 1,
					has_next_page: false,
					items: { count: 0, total: 0, per_page: 24 },
				},
			},
		});

		render(<Home />);

		expect(
			screen.getByText('No anime found matching your criteria')
		).toBeInTheDocument();
	});

	test('renders anime grid and pagination when data is available', () => {
		render(<Home />);

		expect(screen.getByTestId('anime-grid')).toBeInTheDocument();
		expect(screen.getByTestId('pagination')).toBeInTheDocument();
		expect(screen.getByText('Test Anime')).toBeInTheDocument(); // From mockAnimeResponse
	});

	test('renders scroll to top button when showScrollTop is true', () => {
		(useAnimePage as jest.Mock).mockReturnValue({
			...defaultMockImplementation,
			showScrollTop: true,
		});

		render(<Home />);

		expect(screen.getByTestId('scroll-top')).toBeInTheDocument();
	});

	test('does not render scroll to top button when showScrollTop is false', () => {
		render(<Home />);

		expect(screen.queryByTestId('scroll-top')).not.toBeInTheDocument();
	});
});
