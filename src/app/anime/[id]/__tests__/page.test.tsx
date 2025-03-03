import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnimePage from '../page';
import * as animeHooks from '@/hooks/useAnime';

// Mock useParams hook
jest.mock('next/navigation', () => ({
	useParams: () => ({ id: '1' }),
}));

// Mock the useAnimeDetail hook
jest.mock('@/hooks/useAnime', () => ({
	useAnimeDetail: () => ({
		data: {
			data: {
				mal_id: 1,
				title: 'Test Anime',
				title_english: 'Test Anime English',
				images: {
					webp: {
						large_image_url: 'test.webp',
					},
				},
				type: 'TV',
				episodes: 12,
				status: 'Finished Airing',
				score: 8.5,
				synopsis: 'Test synopsis',
				year: 2021,
				genres: [
					{ mal_id: 1, name: 'Action' },
					{ mal_id: 2, name: 'Adventure' },
				],
				streaming: [
					{ name: 'Netflix', url: 'https://netflix.com' },
					{ name: 'Crunchyroll', url: 'https://crunchyroll.com' },
				],
			},
		},
		isLoading: false,
		error: null,
		isError: false,
		isPending: false,
		isSuccess: true,
		status: 'success',
		fetchStatus: 'idle',
	}),
}));

describe('Anime Detail Page', () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const renderWithClient = (ui: React.ReactElement) => {
		return render(
			<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
		);
	};

	it('renders the anime details', () => {
		renderWithClient(<AnimePage />);

		expect(screen.getByText('Test Anime')).toBeInTheDocument();
		expect(screen.getByText('Test Anime English')).toBeInTheDocument();
		expect(screen.getByText('TV')).toBeInTheDocument();
		expect(screen.getByText('12')).toBeInTheDocument();
		expect(screen.getByText('Finished Airing')).toBeInTheDocument();
		expect(screen.getByText('⭐ 8.5')).toBeInTheDocument();
		expect(screen.getByText('2021')).toBeInTheDocument();
		expect(screen.getByText('Action')).toBeInTheDocument();
		expect(screen.getByText('Adventure')).toBeInTheDocument();
		expect(screen.getByText('Test synopsis')).toBeInTheDocument();
		expect(screen.getByText('Netflix')).toBeInTheDocument();
		expect(screen.getByText('Crunchyroll')).toBeInTheDocument();
	});

	it('renders loading state', () => {
		jest.spyOn(animeHooks, 'useAnimeDetail').mockReturnValue({
			data: undefined,
			isLoading: true,
			error: null,
			isError: false,
			isPending: true,
			isSuccess: false,
			status: 'pending',
			fetchStatus: 'fetching',
			isLoadingError: false,
			isRefetchError: false,
			refetch: jest.fn(),
			remove: jest.fn(),
		} as unknown as ReturnType<typeof animeHooks.useAnimeDetail>);

		renderWithClient(<AnimePage />);

		const skeletons = screen.getAllByTestId('loading-skeleton');
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it('renders error state', () => {
		jest.spyOn(animeHooks, 'useAnimeDetail').mockReturnValue({
			data: undefined,
			isLoading: false,
			error: new Error('Failed to load'),
			isError: true,
			isPending: false,
			isSuccess: false,
			status: 'error',
			fetchStatus: 'idle',
			isLoadingError: true,
			isRefetchError: false,
			refetch: jest.fn(),
			remove: jest.fn(),
		} as unknown as ReturnType<typeof animeHooks.useAnimeDetail>);

		renderWithClient(<AnimePage />);

		expect(screen.getByText('Error loading anime details')).toBeInTheDocument();
	});
});
