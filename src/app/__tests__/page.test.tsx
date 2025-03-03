import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../page';
import * as useAnimePage from '@/hooks/useAnimePage';

// Mock the useAnimePage hook
jest.mock('@/hooks/useAnimePage', () => ({
	useAnimePage: () => ({
		page: 1,
		search: '',
		filters: {
			type: '',
			score: '',
			status: '',
			rating: '',
			genres: [],
		},
		data: {
			data: [
				{
					mal_id: 1,
					title: 'Test Anime',
					images: {
						webp: {
							large_image_url: 'test.webp',
							image_url: 'test.webp',
							small_image_url: 'test-small.webp',
						},
						jpg: {
							large_image_url: 'test.jpg',
							image_url: 'test.jpg',
							small_image_url: 'test-small.jpg',
						},
					},
					type: 'TV',
					score: 8.5,
					source: 'Manga',
					duration: '24 min per ep',
					scored_by: 100000,
					rank: 1,
					popularity: 1,
					members: 200000,
					favorites: 10000,
					studios: [
						{ mal_id: 1, name: 'Test Studio', url: 'https://example.com' },
					],
				},
			],
			pagination: {
				has_next_page: true,
				last_visible_page: 2,
				current_page: 1,
				items: {
					count: 1,
					total: 2,
					per_page: 1,
				},
			},
		},
		isFetching: false,
		error: null,
		showScrollTop: false,
		setPage: jest.fn(),
		setFilters: jest.fn(),
		handleSearch: jest.fn(),
		handleClearSearch: jest.fn(),
		scrollToTop: jest.fn(),
	}),
}));

describe('Home Page', () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const renderWithClient = (ui: React.ReactNode) =>
		render(
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
		);

	it('renders the anime list', () => {
		renderWithClient(<Home />);

		expect(screen.getByText('Anime Explorer')).toBeInTheDocument();
		expect(screen.getByText('Test Anime')).toBeInTheDocument();
		expect(screen.getByText('TV')).toBeInTheDocument();
		expect(screen.getByText('⭐ 8.5')).toBeInTheDocument();
	});

	it('renders search bar', () => {
		renderWithClient(<Home />);

		expect(screen.getByPlaceholderText('Search anime...')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
	});

	it('renders filters', () => {
		renderWithClient(<Home />);

		expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/score/i)).toBeInTheDocument();
	});

	it('handles pagination interactions', () => {
		const mockSetPage = jest.fn();
		jest.spyOn(useAnimePage, 'useAnimePage').mockReturnValue({
			page: 3,
			search: '',
			filters: {
				type: '',
				score: '',
				status: '',
				rating: '',
				genres: [],
			},
			data: {
				data: [
					{
						mal_id: 1,
						title: 'Test Anime',
						type: 'TV',
						score: 8.5,
						url: 'https://myanimelist.net/anime/1',
						images: {
							webp: {
								large_image_url: 'test.webp',
								image_url: 'test.webp',
								small_image_url: 'test-small.webp',
							},
							jpg: {
								large_image_url: 'test.jpg',
								image_url: 'test.jpg',
								small_image_url: 'test-small.jpg',
							},
						},
						title_english: 'Test Anime',
						title_japanese: 'テストアニメ',
						status: 'Finished Airing',
						airing: false,
						synopsis: 'Test synopsis',
						year: 2021,
						episodes: 12,
						rating: 'PG-13',
						genres: [],
						source: 'Manga',
						duration: '24 min per ep',
						scored_by: 100000,
						rank: 1,
						popularity: 1,
						members: 200000,
						favorites: 10000,
						studios: [
							{ mal_id: 1, name: 'Test Studio', url: 'https://example.com' },
						],
					},
				],
				pagination: {
					has_next_page: true,
					last_visible_page: 10,
					current_page: 3,
					items: {
						count: 1,
						total: 10,
						per_page: 1,
					},
				},
			},
			isFetching: false,
			error: null,
			showScrollTop: false,
			setPage: mockSetPage,
			setFilters: jest.fn(),
			handleSearch: jest.fn(),
			handleClearSearch: jest.fn(),
			scrollToTop: jest.fn(),
		});

		renderWithClient(<Home />);

		// Test Previous/Next buttons
		const prevButton = screen.getByRole('button', { name: /previous/i });
		const nextButton = screen.getByRole('button', { name: /next/i });
		expect(prevButton).toBeEnabled();
		expect(nextButton).toBeEnabled();

		fireEvent.click(prevButton);
		expect(mockSetPage).toHaveBeenCalledWith(2);

		fireEvent.click(nextButton);
		expect(mockSetPage).toHaveBeenCalledWith(4);

		// Test page number buttons
		expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();

		// Test ellipsis
		expect(screen.getByText('...')).toBeInTheDocument();

		// Test clicking page numbers
		fireEvent.click(screen.getByRole('button', { name: '5' }));
		expect(mockSetPage).toHaveBeenCalledWith(5);

		// Test current page is highlighted
		expect(screen.getByRole('button', { name: '3' })).toHaveClass(
			'bg-blue-600'
		);
	});

	it('renders error state', () => {
		jest.spyOn(useAnimePage, 'useAnimePage').mockReturnValue({
			page: 1,
			search: '',
			filters: {
				type: '',
				score: '',
				status: '',
				rating: '',
				genres: [],
			},
			data: undefined,
			isFetching: false,
			error: new Error('Failed to load'),
			showScrollTop: false,
			setPage: jest.fn(),
			setFilters: jest.fn(),
			handleSearch: jest.fn(),
			handleClearSearch: jest.fn(),
			scrollToTop: jest.fn(),
		});

		renderWithClient(<Home />);

		expect(screen.getByText('Error loading anime list')).toBeInTheDocument();
	});

	it('renders no data found message when data is empty', () => {
		jest.spyOn(useAnimePage, 'useAnimePage').mockReturnValue({
			page: 1,
			search: 'nonexistent anime',
			filters: {
				type: '',
				score: '',
				status: '',
				rating: '',
				genres: [],
			},
			data: {
				data: [],
				pagination: {
					has_next_page: false,
					last_visible_page: 1,
					current_page: 1,
					items: {
						count: 0,
						total: 0,
						per_page: 25,
					},
				},
			},
			isFetching: false,
			error: null,
			showScrollTop: false,
			setPage: jest.fn(),
			setFilters: jest.fn(),
			handleSearch: jest.fn(),
			handleClearSearch: jest.fn(),
			scrollToTop: jest.fn(),
		});

		renderWithClient(<Home />);

		expect(
			screen.getByText('No anime found matching your criteria')
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /clear search/i })
		).toBeInTheDocument();

		// Test clear search button click
		fireEvent.click(screen.getByRole('button', { name: /clear search/i }));
		expect(
			jest.mocked(useAnimePage.useAnimePage)().handleClearSearch
		).toHaveBeenCalled();
	});
});
