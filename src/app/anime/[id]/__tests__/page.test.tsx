import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnimePage from '../page';
import * as animeHooks from '@/hooks/useAnime';

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
			},
		},
		isLoading: false,
		error: null,
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
	});

	it('renders loading state', () => {
		jest.spyOn(animeHooks, 'useAnimeDetail').mockReturnValue({
			isLoading: true,
			isError: false,
			error: null,
			data: undefined,
			isPending: true,
			isSuccess: false,
			status: 'pending',
			fetchStatus: 'fetching',
		} as unknown as ReturnType<typeof animeHooks.useAnimeDetail>);

		renderWithClient(<AnimePage />);

		expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
	});

	it('renders error state', () => {
		jest.spyOn(animeHooks, 'useAnimeDetail').mockReturnValue({
			isLoading: false,
			isError: true,
			error: new Error('Failed to load'),
			data: undefined,
			isPending: false,
			isSuccess: false,
			status: 'error',
			fetchStatus: 'idle',
		} as unknown as ReturnType<typeof animeHooks.useAnimeDetail>);

		renderWithClient(<AnimePage />);

		expect(screen.getByText('Error loading anime details')).toBeInTheDocument();
	});
});
